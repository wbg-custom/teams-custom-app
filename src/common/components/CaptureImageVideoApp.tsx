import { useState } from "react"; //useEffect,
//import * as microsoftTeams from "@microsoft/teams-js";
import { media, SdkError } from "@microsoft/teams-js"; //app,
import { Text, Button, Image, Card } from "@fluentui/react-components";
//import CheckAndAlertForCameraPermission from "../helpers/NavigatorPermission";
import { CardBody } from "reactstrap";

const CaptureImageVideoApp = () => {
  //   useEffect(() => {
  //     // initializing microsoft teams sdk
  //     app.initialize();
  //   });

  const [capturedImage, setCapturedImage] = useState("");
  const [capturedVideo, setCapturedVideo] = useState("");
  const openCamera = () => {
    let defaultVideoAndImageProps: media.VideoAndImageProps = {
      sources: [media.Source.Camera, media.Source.Gallery],
      startMode: media.CameraStartMode.Photo,
      ink: true,
      cameraSwitcher: true,
      textSticker: true,
      enableFilter: true,
      maxDuration: 30,
    };
    //navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    let defaultVideoAndImageMediaInput: media.MediaInputs = {
      mediaType: media.MediaType.VideoAndImage,
      maxMediaCount: 2,
      videoAndImageProps: defaultVideoAndImageProps,
    };
    let videoControllerCallback: media.VideoControllerCallback = {
      onRecordingStarted() {
        console.log("onRecordingStarted Callback Invoked");
      },
    };

    media.selectMedia(
      defaultVideoAndImageMediaInput,
      (error: SdkError, attachments: media.Media[]) => {
        if (error) {
          if (error.message) {
            alert(" ErrorCode: " + error.errorCode + error.message);
          } else {
            alert(" ErrorCode: " + error.errorCode);
          }
        }

        if (attachments) {
          //var videoElement = document.createElement("video");
          attachments[0].getMedia((error: SdkError, blob: Blob) => {
            if (blob) {
              if (blob.type.includes("video")) {
                //videoElement.setAttribute("src", URL.createObjectURL(blob));
                setCapturedVideo(URL.createObjectURL(blob));
              } else if (blob.type.includes("image")) {
                setCapturedImage(URL.createObjectURL(blob));
              }
              console.log('JBR-capture:'+JSON.stringify(URL.createObjectURL(blob)));
            }
            if (error) {
              if (error.message) {
                alert(" ErrorCode: " + error.errorCode + error.message);
              } else {
                alert(" ErrorCode: " + error.errorCode);
              }
            }
          });
        }
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
          <Button onClick={openCamera}>Capture image or video</Button>
          <br />
          <Image src={capturedImage} />
          <video src={capturedVideo}></video>
        </CardBody>
      </Card>
    </>
  );
};

export default CaptureImageVideoApp;
