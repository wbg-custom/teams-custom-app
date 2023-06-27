// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { useState } from 'react';//useEffect
//import * as microsoftTeams from "@microsoft/teams-js";
import { Text, Button, Card} from '@fluentui/react-components'
import { CardBody } from 'reactstrap';
import { iTabContext } from "../../common/models/Context";
/**
 * The 'CaptureVideoWeb' component
 * of your app.
 */
const CaptureVideoWeb: React.FC<iTabContext> = (props) => {
    //  var stream: MediaStream = null;
    // useEffect(() => {
    //     // initializing microsoft teams sdk
    //     microsoftTeams.app.initialize()
    // });

    const[toggleStartStop, setToggleStartStop] = useState(true);
    const[chunks, setChunks] = useState<Blob[]>();
    const[uploadB64, setUploadB64] = useState('');
    

    let mainMediaStream: MediaRecorder;
    function startVideo() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(mediaStream => {
                const videoElement = document.querySelector("video");
                videoElement!.srcObject = mediaStream;
                videoElement?.play();
                //mainMediaStream = mediaStream;
                mainMediaStream = new MediaRecorder(mediaStream);
                mainMediaStream.ondataavailable = e => {
                    if (e.data && e.data.size > 0) {
                      if(chunks === undefined) setChunks([e.data]);
                      else setChunks([...chunks, e.data]);
                    }
                  };
                setToggleStartStop(!toggleStartStop);
            }).catch(error => console.log(error));
    }
    function stopVideo(){
        //if(mainMediaStream){
            mainMediaStream.stop();
            setToggleStartStop(!toggleStartStop);
            saveVideo();
        //}
    }
    function saveVideo() {
        // convert saved chunks to blob
        const blob = new Blob(chunks, {type: 'mp4'});
        // generate video url from blob
        const videoURL = window.URL.createObjectURL(blob);
        // // append videoURL to list of saved videos for rendering
        // const audios = this.state.audios.concat([audioURL]);
        // this.setState({audios});
        console.log('JBR-videoUrl:'+videoURL);
        setUploadB64(videoURL);
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
                        {
                            (toggleStartStop) ? (<Button onClick={startVideo}>Start</Button>) : (<Button onClick={stopVideo}>Stop</Button>)
                        }
                        <video src="" controls>   </video>
                        {
                            
                        }
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default CaptureVideoWeb;