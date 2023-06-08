import { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import { Text, Button, Image, Card } from "@fluentui/react-components";
//import CheckAndAlertForCameraPermission from "../helpers/NavigatorPermission";
import { CardBody } from "reactstrap";

const CaptureImageVideoAll = () => {
  useEffect(() => {
    // initializing microsoft teams sdk
    microsoftTeams.app.initialize();
  });

  const [capturedImage, setCapturedImage] = useState("");
  const [capturedVideo, setCapturedVideo] = useState("");
  const openCamera = () => {
    const defaultVideoAndImageProps: microsoftTeams.media.VideoAndImageProps = {
      sources: [
        microsoftTeams.media.Source.Camera,
        microsoftTeams.media.Source.Gallery,
      ],
      startMode: microsoftTeams.media.CameraStartMode.Photo,
      ink: true,
      cameraSwitcher: true,
      textSticker: true,
      enableFilter: true,
      maxDuration: 30,
    };
    const defaultVideoAndImageMediaInput: microsoftTeams.media.MediaInputs = {
      mediaType: microsoftTeams.media.MediaType.VideoAndImage,
      maxMediaCount: 6,
      videoAndImageProps: defaultVideoAndImageProps,
    };

    let videoControllerCallback: microsoftTeams.media.VideoControllerCallback =
      {
        onRecordingStarted() {
          console.log("onRecordingStarted Callback Invoked");
        },
      };

    microsoftTeams.media.selectMedia(
      defaultVideoAndImageMediaInput,
      (
        error: microsoftTeams.SdkError,
        attachments: microsoftTeams.media.Media[]
      ) => {
        if (error) {
          if (error.message) {
            alert(" ErrorCode: " + error.errorCode + error.message);
          } else {
            alert(" ErrorCode: " + error.errorCode);
          }
        }

        //var videoElement = document.createElement("video");
        attachments[0].getMedia(
          (error: microsoftTeams.SdkError, blob: Blob) => {
            if (blob) {
              if (blob.type.includes("video")) {
                //videoElement.setAttribute("src", URL.createObjectURL(blob));
                setCapturedVideo(URL.createObjectURL(blob));
              }
              else if (blob.type.includes("image")) {
                 setCapturedImage((URL.createObjectURL(blob)));
              }
            }
            if (error) {
              if (error.message) {
                alert(" ErrorCode: " + error.errorCode + error.message);
              } else {
                alert(" ErrorCode: " + error.errorCode);
              }
            }
          }
        );
      }
    );
  };

  return (
    <>
      <Card>
        <Text weight="bold" as="h1">
          Capture Image or Video
        </Text>
        <CardBody>
          <div className="flex columngap"></div>
          <Button onClick={openCamera}>Capture image</Button>
          <br />
          <Image src={capturedImage} />
          <video src={capturedVideo} ></video>
        </CardBody>
      </Card>
    </>
  );
};

export default CaptureImageVideoAll;
