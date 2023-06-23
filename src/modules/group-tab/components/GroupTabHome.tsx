import React, { useContext, useState, useEffect } from "react";
import { Input, Button, Spinner } from "@fluentui/react-components";
import { Search24Regular, Add24Regular } from "@fluentui/react-icons";
import { app, authentication, Context } from "@microsoft/teams-js";
import { useData } from "@microsoft/teamsfx-react";
//import { debounce } from "lodash";
import TestAPIs from "../../../common/constants/TestAPIs";
import "../../../common/css/Tab.css";
import "../../../common/css/GroupTabHome.css";
import { TeamsFxContext, iPhotoList } from "../../../common/models/Context"; //"../../../common/models/context";
import CaptureImageWeb from "../../../common/components/CaptureImageWeb";
import CaptureImage from "../../../common/components/CaptureImage";
import CaptureImgVideoWeb from "../../../common/components/CaptureImgVideoWeb";
import CaptureVideo from "../../../common/components/CaptureVideo";

function GroupTabHome() {
  const [reloadFillData, setReloadFillData] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const toggleShowUploader = () => {
    setShowUpload(!showUpload);
    setShowVideoUpload(false);
  };
  const toggleShowVideoUploader = () => {
    setShowUpload(false);
    setShowVideoUpload(!showVideoUpload);
  };
  const [teamId, setTeamId] = useState("");
  const [channelId, setChannelId] = useState("");
  const [channelName, setChannelName] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const { teamsUserCredential } = useContext(TeamsFxContext);
  // const { loading, data, error } = useData(async () => {
  //   if (teamsUserCredential) {
  //     const userInfo = await teamsUserCredential.getUserInfo();
  //     setToken(teamsUserCredential.ssoToken.token);
  //     return userInfo;
  //   }
  // });

  const [getResponse, setGetResponse] = useState("");
  const [dataPhotoList, setDataPhotoList] = useState<iPhotoList[]>([]);
  const [isDataPhoto, setIsDataPhoto] = useState(false);

  const [token, setToken] = useState("");
  const [isWeb, setIsWeb] = useState(false);
  const [tabContext, setTabContext] = useState({});
  // try {
  //   app.initialize();
  //   const context = await app.getContext();
  //   // const context = app.getContext().then((context) => {
  //   //     //setTabContext(JSON.stringify(context));
  //   //     setTabContext(context);
  //   //     return context;
  //   // });

  //   console.log('JBR-Tabcontext:'+JSON.stringify(context));
  //   if (teamsUserCredential) {
  //     setToken(teamsUserCredential.ssoToken.token);
  //   }
  //   //     setChannelId(context.channel.id);
  // //     setTeamId(context.team.groupId);
  //   fillData();
  // } catch (err) {
  //   console.log("JBR-app.initialize:"+JSON.stringify(err));
  // }
  useEffect(() => {
    app.initialize();
    app.getContext().then((context: any) => {
      if (context.channel?.membershipType === "Private") {
        console.log("JBR-msg: this is private channel");
      } else if (context.channel?.membershipType === "Shared") {
        console.log("JBR-msg: this is shared channel");
      } else {
        console.log("JBR-msg: this is public channel");
      }
      setTabContext(context);
      console.log("JBR-Tabcontext:" + JSON.stringify(tabContext));
      if (context.app.host.clientType! === "web") {
        setIsWeb(true);
      } else {
        setIsWeb(false);
      }
      authentication.getAuthToken().then((value: any) => {
        setToken(value);
      });

      if (teamsUserCredential) {
        const userInfo = teamsUserCredential.getUserInfo();
        setCreatedBy(userInfo.preferredUserName);
        console.log("JBR-userInfo:" + JSON.stringify(userInfo));
      }

      setChannelId(context.channel.id + "");
      setChannelName(context.channel.displayName + "");
      setTeamId(context.team.groupId + "");

      console.log("JBR-Tabcontext: Data set into useState");
    });

    // // initializing microsoft teams sdk
    // app.initialize();
    // app.getContext().then((context: any) => {
    //     setTabContext(JSON.stringify(context));
    //     setChannelId(context.channel.id);
    //     setTeamId(context.team.groupId);
    //     //return context;
    //     console.log('JBR-Tabcontext:'+tabContext);
    //     fillData();
    // });
    // app.initialize().then(() => {
    //     app.getContext().then((context: any) => {
    //       setTabContext(JSON.stringify(context));
    //       setChannelId(context.channel.id);
    //       setTeamId(context.team.groupId);

    //       fillData();
    //       console.log('JBR-Tabcontext:'+tabContext);
    //       authentication.getAuthToken().then((value: any) => {
    //         setToken(value);
    //       });
    //       if (context.app.host.clientType! === "web") {
    //         setIsWeb(true);
    //       } else {
    //         setIsWeb(false);
    //       }
    //     });
    //   });
  }, []);
  useEffect(() => {
    //   // setChannelId( JSON.parse(tabContext)["channel"]["id"]);
    //   // setTeamId(tabContext.team.groupId);
    //   console.log('JBR-Tabcontext:'+tabContext);
    fillData();
  }, [teamId, channelId, token]);

  function fillData() {
    if (teamId == "" || channelId == "" || token == "") return;
    console.log("JBR-msg: filldata() starts");
    setIsDataPhoto(false);
    setGetResponse("");
    var formData = new FormData();
    formData.append("TeamId", teamId);
    formData.append("ChannelId", channelId);
    fetch(TestAPIs.GetPhotoListUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((resData) => {
        console.log("JBR-GetPhotoList:" + JSON.stringify(resData.value));
        setDataPhotoList(resData.value);
        setIsDataPhoto(true);
      })
      .catch((err) => {
        setGetResponse(`Response Error: ${err}`);
        setIsDataPhoto(true);
      });
  }

  //const [txtMessage, setTxtMessage] = useState("");
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
    setResponseMessage("Loading...");
    if (!file) {
      setResponseMessage("Failed! First select file.");
    } else {
      setIsSending(true);
      var formData = new FormData();
      formData.append("TeamId", teamId);
      formData.append("ChannelId", channelId);
      formData.append("file", file);
      formData.append("CreatedBy", createdBy);
      try {
        fetch(TestAPIs.UploadPhotoUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((resData) => {
            console.log(resData);
            setResponseMessage(JSON.stringify(resData));
            setIsSending(false);
            setReloadFillData(!reloadFillData);
          })
          .catch((err) => {
            setResponseMessage(`Response Error: ${err.message}`);
            setIsSending(false);
            setReloadFillData(!reloadFillData);
          });
      } catch (err: any) {
        setResponseMessage(`Response Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <h1>Welcome to WBG Photos QA Tab</h1>
        <div className="searchTxt55Cls">
          <Input contentAfter={<Search24Regular />} />
        </div>
        <div className="searchBtn15Cls">
          <Button
            icon={<Add24Regular />}
            iconPosition="before"
            appearance="primary"
            onClick={() => toggleShowUploader()}>
            Upload
          </Button>
        </div>
        <div className="searchBtn25Cls">
          <Button
            icon={<Add24Regular />}
            iconPosition="before"
            appearance="primary"
            onClick={() => toggleShowVideoUploader()}>
            Capture Videos
          </Button>
        </div>
      </div>
      <div className="narrow bgColorWhite">
        {!isDataPhoto ? (
          <Spinner />
        ) : dataPhotoList ? (
          dataPhotoList.map((row, index) => {
            return (
              <div className="imgDiv" key={index}>
                <a href={row.fileUrl} target="_blank">
                  <img className="imgBox" src={row["fileUrl"]} />
                </a>
                {
                  row.tags?.map((subRow: string, subIndex: number) => {
                    return(
                      <div className="tagCls">
                        {subRow}
                      </div>
                    );
                  })
                }
                <div className="clearBoth"></div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
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
              {isSending ? (
                <Button appearance="primary" disabled>
                  Upload
                </Button>
              ) : (
                <Button appearance="primary" onClick={() => sendRequest()}>
                  Upload
                </Button>
              )}
              <Button appearance="outline" onClick={() => toggleShowUploader()}>
                Close
              </Button>
              <br />

              {responseMessage !== "" ? `Response: ${responseMessage}` : ""}

              <hr></hr>
              <center>
                <h4>OR</h4>
              </center>
              <hr></hr>

              {/* <Button appearance="primary">Capture Image</Button> */}
              {isWeb ? (
                <CaptureImageWeb
                  channelId={channelId}
                  channelName={channelName}
                  teamId={teamId}
                  createdBy={createdBy}
                  token={token}
                />
              ) : (
                <></>
              )}

              <Button appearance="outline" onClick={() => toggleShowUploader()}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {showVideoUpload ? (
        <div className="popupArea">
        <div className="popupBody">
          <div className="popupTitle">
            <h4> Capture Video </h4>
          </div>
          <hr></hr>

              <CaptureVideo
                channelId={channelId}
                channelName={channelName}
                teamId={teamId}
                createdBy={createdBy}
                token={token}
              />

            <Button appearance="outline" onClick={() => toggleShowVideoUploader()}>
              Close
            </Button>
            
            <br />

            {responseMessage !== "" ? `Response: ${responseMessage}` : ""}
          </div>
        </div>
      ): null}

      
    </div>
  );
}

export default GroupTabHome;
