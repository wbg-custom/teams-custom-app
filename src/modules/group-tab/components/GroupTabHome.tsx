import React, { useState, useEffect } from "react";
import { Input, Button, Spinner } from "@fluentui/react-components";
import { Search24Regular, Add24Regular } from "@fluentui/react-icons";
import { app, authentication } from "@microsoft/teams-js";
//import { debounce } from "lodash";
import TestAPIs from "../../../common/constants/TestAPIs"; //"../../../common/constants/TestApis";
import "../../../common/css/Tab.css";
import "../../../common/css/GroupTabHome.css";

function GroupTabHome() {
  const [reloadFillData, setReloadFillData] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const toggleShowUploader = () => {
    setShowUpload(!showUpload);
  };
  const [channelId, setChannelId] = useState("");
  const [teamId, setTeamId] = useState("");
  
  const [isWeb, setIsWeb] = useState(false);
  const [tabContext, setTabContext] = useState("");
  useEffect(() => {
    // initializing microsoft teams sdk
    app.initialize().then(() => {
        app.getContext().then((context: any) => {
          setTabContext(JSON.stringify(context));
          setChannelId(context.channel.id);
          setTeamId(context.team.groupId);
          
          fillData();
          console.log('JBR-Tabcontext:'+tabContext);
          authentication.getAuthToken().then((value: any) => {
            setToken(value);
          });
          if (context.app.host.clientType! === "web") {
            setIsWeb(true);
          } else {
            setIsWeb(false);
          }
        });
      });
  }, [reloadFillData]);

  const [token, setToken] = useState("token001");
  const [getResponse, setGetResponse] = useState("");
  const [dataPhotoList, setDataPhotoList] = useState([]);
  const [isDataPhoto, setIsDataPhoto] = useState(false);
  
  const fillData = () => {
      setIsDataPhoto(false);
      setGetResponse("");
      var formData = new FormData();
      formData.append("TeamId",teamId);
      formData.append("ChannelId",channelId);
      fetch(TestAPIs.GetPhotoListUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      }).then((response) => response.json())
        .then((resData) => {
          console.log("JBR-GetPhotoList:"+JSON.stringify(resData.value));
          setDataPhotoList(resData.value);
          setIsDataPhoto(true);
        })
        .catch((err) => {
            setGetResponse(`Response Error: ${err}`);
            setIsDataPhoto(true);
        });
    
  };

  const [txtMessage, setTxtMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [file, setFile] = useState();
    function handlePhotoSelect(e: any) {
        console.log(e.target.files);
        //setFile(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
  const sendRequest = () => {
    if (isSending) return;
    // update state
    // send the actual request
    setResponseMessage('Loading...');
    if (!file) {
      setResponseMessage("Failed! First select file.");
    } else {
      setIsSending(true);
      var formData = new FormData();
      formData.append("TeamId",teamId);
      formData.append("ChannelId",channelId);
      formData.append("file",file);
      fetch(TestAPIs.UploadPhotoUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          setResponseMessage(JSON.stringify(resData));
          setIsSending(false);
          setReloadFillData(!reloadFillData);
        })
        .catch((err) => {
          setResponseMessage(`Response Error: ${err}`);
          setIsSending(false);
          setReloadFillData(!reloadFillData);
        });
    }
  };

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <h1>Welcome to WBG Photos QA Tab</h1>
        <div className="searchTxtCls">
          <Input contentAfter={<Search24Regular />} />
        </div>
        <div className="searchBtnCls">
          <Button
            icon={<Add24Regular />}
            iconPosition="before"
            appearance="primary"
            onClick={() => toggleShowUploader()}
          >
            Upload
          </Button>
        </div>
      </div>
      <div className="narrow bgColorWhite">
        {
            !isDataPhoto ? (
                <Spinner/>
            ) : (
                dataPhotoList.map((row, index) => {
                    return(
                        <div className="imgDiv" key={index}>
                            <img className="imgBox" src={row['fileUrl']}/>
                        </div>
                    )
                })
            )
        }
        {getResponse}
      </div>
      {showUpload ? (
        <div className="popupArea">
          <div className="popupBody">
            <div className="popupTitle">
              <h4> Upload or Capture Photo </h4>
            </div>
            <div className="popupContent">
              <input type="file" onChange={handlePhotoSelect} />
            </div>
            <div className="popupContent">
              {
                isSending ? (
                <Button appearance="primary" disabled>
                    Upload
                 </Button>
                ):
                (
                <Button appearance="primary" onClick={() => sendRequest()}>
                    Upload
                 </Button>
                )
              }
              <Button appearance="outline" onClick={() => toggleShowUploader()}>
                Cancel
                </Button>
              <br/>

              {
                responseMessage !== "" ? `Response: ${responseMessage}` : ""
              }

              <hr></hr>
              <center>
                <h4>OR</h4>
              </center>
              <hr></hr>

              <Button appearance="primary">Capture Image</Button>
              <Button appearance="outline" onClick={() => toggleShowUploader()}>
                Cancel
              </Button>

            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GroupTabHome;
