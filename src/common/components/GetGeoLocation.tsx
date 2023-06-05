// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { useEffect, useState } from 'react';
import * as microsoftTeams from "@microsoft/teams-js";
import { location as tjsLocation } from "@microsoft/teams-js";
import { Text, Button, Card} from '@fluentui/react-components';
import { CardBody } from 'reactstrap';
/**
 * The 'GetGeoLocation' component
 * of your app.
 */
const GetGeoLocation = () => {
    const [geoLocationValue, setGeoLocationValue] = useState<any>(null);
    const [hasPermission, setHasPermission] = useState('defualt');
    const [requestPermission, setRequestPermission] = useState('defualt');
    const [isSupported, setIsSupported] = useState('defualt');
  useEffect(() => {
    //alert('setting values-1');
    microsoftTeams.app.initialize().then(() => {
       //alert('setting values-2');
    });
  });

  // Method to get current user's geo location
  // If the value of allowChooseLocation is true, then the users can choose any location of their choice.
  // If the value of allowChooseLocation is false, then the users cannot change their current location.
  // If the value of showMap is false, the current location is fetched without displaying the map. 
  // showMap is ignored if allowChooseLocation is set to true.
  function getLocation() {
    // microsoftTeams.location.getLocation({ allowChooseLocation: true, showMap: true }, (error, location) => {
    //     console.log("error"+error);
    //     console.log("location"+location);
    //      var currentLocation=location;
    //     });
    // alert('getLocation()');
    // microsoftTeams.geoLocation.hasPermission().then((val)=>{
    //     setHasPermission(val);
    // });
    // microsoftTeams.geoLocation.requestPermission().then((val)=>{
    //     setRequestPermission(val);
    // });
    // setIsSupported(microsoftTeams.geoLocation.isSupported);

    
    // microsoftTeams.geoLocation.hasPermission().then((val)=>{
    //     if(val)
    //         setHasPermission('true');
    //     else
    //         setHasPermission('false');
    // });
    // microsoftTeams.geoLocation.requestPermission().then((val)=>{
    //     //setRequestPermission(val);
    //     if(val)
    //         setRequestPermission('true');
    //     else
    //         setRequestPermission('false');
    // });
    
    microsoftTeams.geoLocation.isSupported() ? setIsSupported('true') : setIsSupported('false');
    var valLocation = tjsLocation.getLocation({ allowChooseLocation: true, showMap: true }, (error: any, location: any) => {
        let currentLocation = JSON.stringify(location);
        setGeoLocationValue(location);
        return currentLocation;
    });
 
    // microsoftTeams.geoLocation.getCurrentLocation().then((location) => {
    //   setGeoLocationValue(location);
    // }).catch((error) => {
    //   console.error(error);
    //   if (error.message) {
    //     alert(" ErrorCode1: " + error.errorCode +' message:'+ error.message);
    //   } else {
    //     alert(" ErrorCode2: " + error.errorCode);
    //   }
    // });
  }

  // Method to show geo location for given latitude and longitude values.
  // Method to show geo location for given latitude and longitude values.
  function showLocation() {
    // Methos to ask for permission and then show current user location
    microsoftTeams.geoLocation.map.showLocation(geoLocationValue).catch((error) => {
      // If there's any error, an alert shows the error message/code
      if (error) {
        if (error.message) {
          alert(" ErrorCode3: " + error.errorCode +' message:'+ error.message);
        } else {
          alert(" ErrorCode4: " + error.errorCode);
        }
        return;
      }
    });
  }

  return (
    <>
      {/* Card for Get/Show Geo-Location */}
      <Card>        
          <Text weight="bold">Get Location</Text>       
        <CardBody>
        <div className='flex columngap'>
            <Text weight="semibold">SDK used:</Text><br/>
            <Text>navigator, microsoftTeams</Text><br/>
            <Text weight="semibold">Method</Text><br/>
            <Text>navigator.geolocation.getCurrentPosition, teams.location</Text><br/>

            <Text weight="semibold">hasPermission: {hasPermission}</Text><br/>
            <Text weight="semibold">requestPermission: {requestPermission}</Text><br/>
            <Text weight="semibold">isSupported: {isSupported}</Text><br/>

            <Button onClick={getLocation} >Get Location</Button><br/>
            {/* {JSON.stringify(geoLocationValue) !== '{}' &&
              <Text>{JSON.stringify(geoLocationValue)}</Text>} */}
              <Text>{JSON.stringify(geoLocationValue)}</Text><br/>
            <Button onClick={showLocation}>Show Location</Button><br/>
        </div>
        </CardBody>
      </Card>
    </>
  );
}

export default GetGeoLocation;