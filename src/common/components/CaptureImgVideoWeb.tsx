import React, { useState, useEffect, Component } from "react"; //useEffect,
import { Text, Button, Image, Card } from "@fluentui/react-components";
import { CardBody } from "reactstrap";
import { SdkError, media } from "@microsoft/teams-js"; //, geoLocation
import * as microsoftTeams from "@microsoft/teams-js";

import { iTabContext } from "../../common/models/Context";
import TestAPIs from "../../common/constants/TestAPIs";

const CaptureImgVideoWeb: React.FC<iTabContext> = (props) =>{
    
  const [capturedImage, setCapturedImage] = useState("");
  const [capturedVideo, setCapturedVideo] = useState("");
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  // const [accuracy, setAccuracy] = useState("");
  // const [isLocation, setIsLocation] = useState(false);
  const [isSendingCapt, setIsSendingCapt] = useState(false);
  const [capImgUpRes, setCapImgUpRes] = useState("");
  const [imgBase64, setImgBase64] = useState("");

  const sendCaptureImageVideo = () => {
    if (isSendingCapt) return;
    // update state
    // send the actual request
    setCapImgUpRes("Loading...");
    if (!imgBase64 || imgBase64 == '') {
      setCapImgUpRes("Failed! First capture video.");
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

  
    // navigator.permissions.query({ name: "geolocation" }).then(function (result) {
    //   console.log("geolocation permission:", result.state);
    // });

    // let videoControllerCallback: media.VideoControllerCallback = {
    //   onRecordingStarted() {
    //     alert('onRecordingStarted Callback Invoked');
    //   },
    // };

    let videoProps: media.VideoProps  = {
    // //   sources: [media.Source.Camera, media.Source.Gallery],
    // //   startMode: media.CameraStartMode.Photo,
    //   isFullScreenMode: true,
    //   isStopButtonVisible: true,
    //   cameraSwitcher: true,
    //   maxDuration: 30
      maxDuration: 30, // the maximumDuration is the time in seconds after which the recording should terminate automatically. This value can be changed.
      isFullScreenMode: true,
      isStopButtonVisible: false,
      //videoController: new media.VideoController(videoControllerCallback)
    };
    //navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    let mediaInput: media.MediaInputs = {
      // mediaType: media.MediaType.Video,
      // maxMediaCount: 6,
      // videoProps: videoProps,
      mediaType: media.MediaType.Video,
      maxMediaCount: 1,
      videoProps: videoProps
    };

    useEffect(() => {
      microsoftTeams.app.initialize();
    });
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
  
    let videoControllerCallback: microsoftTeams.media.VideoControllerCallback = {
      onRecordingStarted() {
        console.log('onRecordingStarted Callback Invoked');
      },
    };

  const deviceCapabilities = () => {
    media.selectMedia(
      mediaInput,
      (error: SdkError, attachments: media.Media[]) => {
        if (error) {
          if (error.message) {
            alert(" ErrorCode: " + error.errorCode + error.message);
          } else {
            alert(" ErrorCode: " + error.errorCode);
          }
        }
        if (attachments) {
        //   let y = attachments[0];
        //   let imageString = y.mimeType + ";base64," + y.preview;
        attachments[0].getMedia((error: SdkError, blob: Blob) => {
            if (blob) {
                if (blob.type.includes("video")) {
                    //videoElement.setAttribute("src", URL.createObjectURL(blob));
                    setCapturedVideo(URL.createObjectURL(blob));
                }
                else{
                    setCapturedImage(blob.type + ";base64," + URL.createObjectURL(blob));
                }
            }
        });
        }
    });
    // console.log("isSupported", geoLocation.isSupported());
    // geoLocation.getCurrentLocation().then((result) => {
    //   console.log("getCurrentLocation", result);
    // });
    // navigator.geolocation.getCurrentPosition(success, error, options);
  };

    return (
        <>
        <Card>
          <Text weight="bold" as="h1">
            Capture Video
          </Text>
          <CardBody>
            <div className="flex columngap"></div>
            <Button onClick={deviceCapabilities}>Capture image or video</Button>
            <br />
            {
              capturedImage ? (<Image src={capturedImage} />) : (capturedVideo ? (<video src={capturedVideo}></video>) : <></>)
            }
            <br/>
            <hr/>
            <Button onClick={sendCaptureImageVideo}>Capture image or video</Button>
          </CardBody>
        </Card>

        </>
    );
}

export default CaptureImgVideoWeb;