// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { useEffect } from 'react';
import * as microsoftTeams from "@microsoft/teams-js";
import { Text, Button, Card} from '@fluentui/react-components'
import { CardBody } from 'reactstrap';
import { iTabContext } from "../../common/models/Context";
/**
 * The 'CaptureVideoWeb' component
 * of your app.
 */
const CaptureVideoWeb: React.FC<iTabContext> = (props) => {
    //  var stream: MediaStream = null;
    useEffect(() => {
        // initializing microsoft teams sdk
        microsoftTeams.app.initialize()
    })

    //var mainMediaStream: MediaStream;
    function captureVideo() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(mediaStream => {
                const videoElement = document.querySelector("video");
                videoElement!.srcObject = mediaStream;
                videoElement?.play();
                //mainMediaStream = mediaStream;
            }).catch(error => console.log(error));
    }
    // function stopVideo(){
    //     if(mainMediaStream){
    //         //mainMediaStream.stop();
    //     }
    // }

    return (
        <>
            {/* Card for showing Video */}
            <Card>
            <Text weight='bold' as="h1">Capture Video (Web only) </Text>                
                <CardBody>
                    <div className='flex columngap'>
                        <Text>Checks for permission to use media input</Text>
                        <Text weight='medium'>SDK used:</Text>
                        <Text>navigator</Text>
                        <Text weight='medium'>Method:</Text>
                        <Text> navigator.mediaDevices.getUserMedia</Text>
                        <Button onClick={captureVideo}>Capture video </Button>
                       
                        <video src="" controls>   </video>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default CaptureVideoWeb;