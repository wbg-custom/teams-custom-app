// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { useState } from "react";//useEffect, 
//import * as microsoftTeams from "@microsoft/teams-js";
import { SdkError, media } from "@microsoft/teams-js";//, geoLocation
import { Text, Button, Image, Card } from "@fluentui/react-components";
//import CheckAndAlertForCameraPermission from "../helpers/NavigatorPermission";
import { CardBody } from "reactstrap";
/**
 * The 'CaptureImageWeb' component
 * of your app.
 */

const CaptureImageWeb = () => {
  //var imageCapture: ImageCapture;
  const [capturedImage, setCapturedImage] = useState("");

  // useEffect(() => {
  //   // initializing microsoft teams sdk
  //   microsoftTeams.app.initialize();
  // });
  // // Method to validate before capturing media
  // function captureMedia() {
  //     // Method to ask for image capture permission and then select media
  //     CheckAndAlertForCameraPermission();
  //     // navigator.mediaDevices.getUserMedia({ video: true })
  //     //     .then(mediaStream => {
  //     //         const track = mediaStream.getVideoTracks()[0];
  //     //         imageCapture = new ImageCapture(track);
  //     //         imageCapture.takePhoto()
  //     //             .then((blob: Blob | MediaSource) => {
  //     //                 setCapturedImage(URL.createObjectURL(blob));
  //     //             })
  //     //     })
  //     //     .catch(error => console.log(error));
  //     let mimeType = "jpeg";
  //         microsoftTeams.media.captureImage((error, files) => {
  //             // If there's any error, an alert shows the error message/code
  //             if (error) {
  //                 if (error.message) {
  //                     alert(" ErrorCode: " + error.errorCode + error.message);
  //                 } else {
  //                     alert(" ErrorCode: " + error.errorCode);
  //                 }
  //             } else if (files) {
  //                 var image = files[0].content;
  //                 // Adding this image string in src attr of image tag will display the image on web page.
  //                 let imageString = "data:" + mimeType + ";base64," + image;
  //                 setCapturedImage(imageString);
  //             }
  //         });

  // }

//   const options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0,
//   };
//   function success(pos: any) {
//     const crd = pos.coords;
//     console.log("Your current position is:");
//     console.log(`Latitude : ${crd.latitude}`);
//     console.log(`Longitude: ${crd.longitude}`);
//     console.log(`More or less ${crd.accuracy} meters.`);
//   }
//   function error(err: any) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//   }
  const deviceCapabilities = () => {
    // navigator.permissions.query({ name: "geolocation" }).then(function (result) {
    //   console.log("geolocation permission:", result.state);
    // });
    let imageProp: media.ImageProps = {
      sources: [media.Source.Camera, media.Source.Gallery],
      startMode: media.CameraStartMode.Photo,
      ink: false,
      cameraSwitcher: false,
      textSticker: false,
      enableFilter: true,
    };
    navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    let mediaInput: media.MediaInputs = {
      mediaType: media.MediaType.Image,
      maxMediaCount: 10,
      imageProps: imageProp,
    };
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
          let y = attachments[0];
          console.log('jbr-y:'+ JSON.stringify(y));
          // img.src = "data:" + y.mimeType + ";base64," + y.preview;
          let imageString = y.mimeType + ";base64," + y.preview;
          setCapturedImage(imageString);
        }
        return true;
      }
    );
    // console.log("isSupported", geoLocation.isSupported());
    // geoLocation.getCurrentLocation().then((result) => {
    //   console.log("getCurrentLocation", result);
    // });
    // navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <>
      {/* Card for capturing single image */}
      <Card>
        <Text weight="bold" as="h1">
          Capture Image - 1
        </Text>
        <CardBody>
          <div className="flex columngap">
            <Text>Checks for permission before capturing image.</Text><br/>

            <Text weight="medium">SDK used: </Text><br/>
            <Text>navigator, microsoftTeams </Text><br/>
            <Text weight="medium">Method: </Text><br/>
            <Text>navigator.mediaDevices.getUserMedia, teams.getmedia</Text><br/>
            <Button onClick={deviceCapabilities}>Capture image</Button><br/>
            <Image src={capturedImage} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CaptureImageWeb;
