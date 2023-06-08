// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { useEffect, useState } from 'react';
import { app, SdkError, geoLocation, media} from "@microsoft/teams-js";
import { Text, Button, Image, Card, CardHeader} from '@fluentui/react-components'
import { CardBody} from 'reactstrap';
import { Carousel } from 'rsuite';

/**
 * The 'CaptureImage' component
 * of your app.
 */

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function success(pos: any) {
  const crd = pos.coords;
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}
function error(err: any) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
const deviceCapabilities = () => {
  navigator.permissions.query({ name: "geolocation" }).then(function (result) {
    console.log("geolocation permission:", result.state);
  });
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
        console.log(y);
        // img.src = "data:" + y.mimeType + ";base64," + y.preview;
      }
    }
  );
  console.log("isSupported", geoLocation.isSupported());
  geoLocation.getCurrentLocation().then((result) => {
    console.log("getCurrentLocation", result);
  });
  navigator.geolocation.getCurrentPosition(success, error, options);
};

const CaptureImage = () => {
  const [capturedImage] = useState('');
  const [capturedImages, setCapturedImages] = useState<any[]>([]);

  useEffect(() => {
    // initializing microsoft teams sdk
    app.initialize();//microsoftTeams.
  })

  // Method to validate before capturing media
  function captureMultipleImages(mediaCount: number) {
    // Method to ask for image capture permission and then select media
       let imageProp: media.ImageProps = {//microsoftTeams.
      sources: [media.Source.Camera, media.Source.Gallery],//microsoftTeams.
      startMode: media.CameraStartMode.Photo,//microsoftTeams.
      ink: false,
      cameraSwitcher: false,
      textSticker: false,
      enableFilter: true,
    };

   
    let mediaInput: media.MediaInputs = {//microsoftTeams.
      mediaType: media.MediaType.Image,//microsoftTeams.
      maxMediaCount: mediaCount,
      imageProps: imageProp
    };
    
    media.selectMedia(mediaInput, (error: SdkError, attachments: media.Media[]) => {//microsoftTeams.
      // If there's any error, an alert shows the error message/code
      if (error) {
        if (error.message) {
          alert(" ErrorCode: " + error.errorCode + error.message);
        } else {
          alert(" ErrorCode: " + error.errorCode);
        }
      } else if (attachments) {

        // creating selected images array to show preview 
        const imageArray: any[] = attachments.map((item, index) => {         
          return (
                <img alt='img'
                  src={"data:" + item.mimeType + ";base64," + item.preview}  
                />
              )
        })
        setCapturedImages(imageArray);
      }
    });
  }

  deviceCapabilities();
  return (
    <>
      {/* Card for capturing single image */}
      <Card>
        
          <Text weight="bold">Capture Image</Text>
        
        <CardBody>
          <div className='columngap'>
            <Text>Checks for permission before capturing image.</Text>
            <Button onClick={() => captureMultipleImages(1)} >Capture Image</Button>
          </div>
        </CardBody>
        {capturedImage !== '' &&
          <div className="wrapper">
            <div className="box2"> 
                {/* renderMainArea={() => ( */}
                    <Image src={"data:image/png;base64," + capturedImage} />
                {/* )} */}
            </div>          
        </div>
        }
      </Card>
      {/* Card for showing multiple images */}
      <Card>
        <CardHeader>
          <Text weight="bold">Capture Multiple Image (Mobile Only)</Text>
        </CardHeader>
        <CardBody>
          <div>
            <Button onClick={() => captureMultipleImages(2)}>Capture multiple images</Button>
          </div>           
          {capturedImages.length !== 0 &&             
            <Carousel className="custom-slider">             
            {capturedImages}
          </Carousel>
          }
        </CardBody>
      </Card>
    </>
  );
}

export default CaptureImage;