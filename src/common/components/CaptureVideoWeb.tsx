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

    function captureVideo() {
        // navigator.mediaDevices.getUserMedia({ video: true })
        //     .then(mediaStream => {
        //         const videoElement = document.querySelector("video");
        //         videoElement!.srcObject = mediaStream;
        //     })
        //     .catch(error => console.log(error));
        microsoftTeams.media.selectMedia({ maxMediaCount: 1, mediaType: microsoftTeams.media.MediaType.Video }, (error: microsoftTeams.SdkError, attachments: microsoftTeams.media.Media[]) => {
            // If there's any error, an alert shows the error message/code
            if (error) {
                if (error.message) {
                    alert(" ErrorCode: " + error.errorCode + error.message);
                } else {
                    alert(" ErrorCode: " + error.errorCode);
                }
            }
       
            if (attachments) {
                // taking the first attachment  
                let videoResult = attachments[0];
       
                // setting audio string which can be used in Video tag
                //let videoData = "data:" + videoResult.mimeType + ";base64," + videoResult.preview;
                let videoData = videoResult.mimeType + ";base64," + videoResult.preview;
                const videoElement = document.querySelector("video");
                videoElement!.src = videoData;
            }
        });
    }

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