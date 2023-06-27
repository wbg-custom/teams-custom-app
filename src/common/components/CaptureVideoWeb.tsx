// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { useState } from 'react';//useEffect
//import * as microsoftTeams from "@microsoft/teams-js";
import { Text, Button, Card} from '@fluentui/react-components'
import { CardBody } from 'reactstrap';
import { iTabContext } from "../../common/models/Context";
import TestAPIs from "../../common/constants/TestAPIs";
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
    const[chunks, setChunks] = useState<Blob[]>([]);
    const[uploadB64, setUploadB64] = useState('');
    const[isUpldngVdo, setIsUpldngVdo] = useState(false);
    const[uploadMsg, setUploadMsg] = useState('');
    const[constMediaStream, setConstMediaStream] = useState<MediaStream>();
    

    //let mainMediaStream: MediaRecorder;
    const handleStopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    };
    const handleDataAvailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
            setChunks((prev) => [...prev, e.data]);
        }
    };
    const[mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
    function startVideo() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(mediaStream => {
                const videoElement = document.querySelector("video");
                videoElement!.srcObject = mediaStream;
                videoElement?.play();
                //mainMediaStream = mediaStream;
                //mainMediaStream = new MediaRecorder(mediaStream);
                setConstMediaStream(mediaStream);
                const mediaRecorder = new MediaRecorder(mediaStream);
                setMediaRecorder(mediaRecorder);
                mediaRecorder?.start();
                mediaRecorder.addEventListener("dataavailable", handleDataAvailable);

                // if(mediaRecorder){
                // mediaRecorder.ondataavailable = e => {
                //     if (e.data && e.data.size > 0) {
                //       if(chunks === undefined) setChunks([e.data]);
                //       else setChunks([...chunks, e.data]);
                //     }
                //   };
                // }
                setToggleStartStop(!toggleStartStop);
            }).catch(error => console.log(error));
    }
    function stopVideo(){
        if(mediaRecorder){
            mediaRecorder.stop();
            const videoElement = document.querySelector("video");
            videoElement?.pause();
            setToggleStartStop(!toggleStartStop);
            saveVideo();
            constMediaStream?.getTracks().forEach( (track) => {
              track.stop();
            });
        }
    }
    function saveVideo() {
        // convert saved chunks to blob
        const blob = new Blob(chunks, {type: "video\/mp4"});
        // generate video url from blob
        const videoURL = window.URL.createObjectURL(blob);
        // // append videoURL to list of saved videos for rendering
        // const audios = this.state.audios.concat([audioURL]);
        // this.setState({audios});
        console.log('JBR-videoUrl:'+videoURL);

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result as string;
            setUploadB64(base64data);
            console.log("JBR-VideoB64:"+base64data);
        }
    }

    const uploadCaptureVideo = () => {
        if (isUpldngVdo) return;
        // update state
        // send the actual request
        setUploadMsg("Loading...");
        if (!uploadB64 || uploadB64 == '') {
            setUploadMsg("Failed! First capture video.");
        } else {
          setIsUpldngVdo(true);
          var data = {
            'TeamId' : props.teamId,
            'ChannelId' : props.channelId,
            'base64': uploadB64,
            'CreatedBy': props.createdBy,
            'extension': 'mp4'
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
                setUploadMsg(JSON.stringify(resData));
                setIsUpldngVdo(false);
              })
              .catch((err) => {
                setUploadMsg(`Response Error: ${err.message}`);
                setIsUpldngVdo(false);
              });
          } catch (err: any) {
            setUploadMsg(`Response Error: ${err.message}`);
          }
        }
      };

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
                            (uploadB64) ? (
                                <>
                                    <Button onClick={uploadCaptureVideo}>Upload Video</Button><br/>
                                    <span>{uploadMsg}</span>
                                </>
                            ) : (<></>)
                        }
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default CaptureVideoWeb;