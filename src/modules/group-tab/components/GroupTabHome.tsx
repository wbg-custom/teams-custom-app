import React, { useState, useEffect } from "react";
import { Input, Button, Spinner } from "@fluentui/react-components";
import { Search24Regular, Add24Regular } from "@fluentui/react-icons";
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
  
  useEffect(() => {
    fillData();
  }, [reloadFillData]);

  const [token, setToken] = useState("token001");
  const [getResponse, setGetResponse] = useState("");
  const [dataPhotoList, setDataPhotoList] = useState([]);
  const [isDataPhoto, setIsDataPhoto] = useState(false);
  
  const fillData = () => {
      setIsDataPhoto(false);
      setGetResponse("");
      var formData = new FormData();
      formData.append("TeamId","team001");
      formData.append("ChannelId","channel001");
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
  const sendRequest = () => {
    if (isSending) return;
    // update state
    // send the actual request
    if (txtMessage === "") {
      setResponseMessage("Failed! First fill the text box.");
    } else {
      setIsSending(true);
      fetch(TestAPIs.TestAPIPostUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Name: "test call",
          Email: "text email",
          Message: txtMessage,
        }),
      })
        .then((response) => response.json())
        .then((resData) => {
          console.log(resData);
          setResponseMessage(JSON.stringify(resData));
          setIsSending(false);
        })
        .catch((err) => {
          setResponseMessage(`Response Error: ${err}`);
          setIsSending(false);
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
              <input type="file" />
            </div>
            <div className="popupContent">
              <Button appearance="primary" onClick={() => sendRequest()}>
                Upload
              </Button>
              <Button appearance="outline" onClick={() => toggleShowUploader()}>
                Cancel
              </Button> <br/>

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
