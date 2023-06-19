import React, { useState, useEffect, Component } from "react"; //useEffect,
import { Text, Button, Image, Card } from "@fluentui/react-components";
import { CardBody } from "reactstrap";
import * as microsoftTeams from "@microsoft/teams-js";

import { iTabContext } from "../../common/models/Context";
import TestAPIs from "../../common/constants/TestAPIs";

const CaptureImgVideoWeb: React.FC<iTabContext> = (props) =>{
    
  const [capturedImage, setCapturedImage] = useState("");
  const [capturedVideo, setCapturedVideo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [isLocation, setIsLocation] = useState(false);
  const [isSendingCapt, setIsSendingCapt] = useState(false);
  const [capImgUpRes, setCapImgUpRes] = useState("");
  const [imgBase64, setImgBase64] = useState("");

  const sendCaptureImage = () => {
    if (isSendingCapt) return;
    // update state
    // send the actual request
    setCapImgUpRes("Loading...");
    if (!imgBase64 || imgBase64 == '') {
      setCapImgUpRes("Failed! First capture photo.");
    } else {
      setIsSendingCapt(true);
      var data = {
        'TeamId' : props.teamId,
        'ChannelId' : props.channelId,
        'base64': imgBase64,
        'CreatedBy': props.createdBy
      }
      try {
        fetch(TestAPIs.UploadPhotoB64Url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${props.token}`,
            "content-type": "application/json"
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((resData) => {
            console.log(resData);
            setCapImgUpRes(JSON.stringify(resData));
            setIsSendingCapt(false);
          })
          .catch((err) => {
            setCapImgUpRes(`Response Error: ${err.message}`);
            setIsSendingCapt(false);
          });
      } catch (err: any) {
        setCapImgUpRes(`Response Error: ${err.message}`);
      }
    }
  };

  
  const openCamera = () => {
    const defaultVideoAndImageProps: microsoftTeams.media.VideoAndImageProps = {
        sources: [microsoftTeams.media.Source.Camera, microsoftTeams.media.Source.Gallery],
        startMode: microsoftTeams.media.CameraStartMode.Photo,
        ink: true,
        cameraSwitcher: true,
        textSticker: true,
        enableFilter: true,
        maxDuration: 30
      }
      const defaultVideoAndImageMediaInput: microsoftTeams.media.MediaInputs = {
        mediaType: microsoftTeams.media.MediaType.VideoAndImage,
        maxMediaCount: 6,
        videoAndImageProps: defaultVideoAndImageProps
      }
  }

    return (
        <>
        <Card>
          <Text weight="bold" as="h1">
            Capture Image or Video
          </Text>
          <CardBody>
            <div className="flex columngap"></div>
            <Button onClick={openCamera}>Capture image or video</Button>
            <br />
            <Image src={capturedImage} />
            <video src={capturedVideo}></video>
          </CardBody>
        </Card>

        </>
    );
}

export default CaptureImgVideoWeb;