// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React, { useState, useEffect, Component } from "react";//useEffect, 
//import * as microsoftTeams from "@microsoft/teams-js";
import { SdkError, media } from "@microsoft/teams-js";//, geoLocation
import { Text, Button, Image, Card } from "@fluentui/react-components";
//import CheckAndAlertForCameraPermission from "../helpers/NavigatorPermission";
import { CardBody } from "reactstrap";
import { iTabContext } from "../../common/models/Context"
/**
 * The 'CaptureImageWeb' component
 * of your app.
 */

const CaptureImageWeb: React.FC<iTabContext> = (props) => {
  //var imageCapture: ImageCapture;
  const [capturedImage, setCapturedImage] = useState("");
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [accuracy, setAccuracy] = useState('');
  const [isLocation, setIsLocation] = useState(false);
  const getCurrentLocation =()=> {        
      navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
          if (result.state === 'denied') {
              //setShowComments(true);
              //return false;
              setIsLocation(false);
          }
          else {
              //setShowComments(false);
              setIsLocation(true);
          }
      });
      
      // Method to ask for image capture permission and then select media
      navigator.geolocation.getCurrentPosition(function (position) {
          var coordinates = position.coords;
          // var location = {
          //     latitude: coordinates.latitude,
          //     longitude: coordinates.longitude,
          // }
          //setGeoLocationValue(JSON.stringify(location))
          setLatitude(coordinates.latitude.toString());
          setLongitude(coordinates.longitude.toString());
          setAccuracy(coordinates.accuracy.toString());
      });
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

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
    //navigator.mediaDevices.getUserMedia({ audio: true, video: true });
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
          //console.log('jbr-y:'+ JSON.stringify(y));
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
  
    // Method to validate before capturing media
  

  return (
    <>
      {/* Card for capturing single image */}
      <Card>
        <Text weight="bold" as="h1">
          Capture Image - 1
        </Text>
        <CardBody>
          <div className="flex columngap">
            {props.channelId} | {props.teamId} | {props.channelName}
            {/* <Text>Checks for permission before capturing image.</Text><br/>
            <Text weight="medium">SDK used: </Text><br/>
            <Text>navigator, microsoftTeams </Text><br/>
            <Text weight="medium">Method: </Text><br/>
            <Text>navigator.mediaDevices.getUserMedia, teams.getmedia</Text><br/> */}
            <Button onClick={deviceCapabilities}>Capture image</Button><br/>
            <Image src={capturedImage} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CaptureImageWeb;
