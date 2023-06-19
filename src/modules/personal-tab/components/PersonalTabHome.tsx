import "../../../common/css/Tab.css";
//import { Loader, Input, Button } from "@fluentui/react-components";
import React, { useContext, useState, useEffect } from "react"; //, useState, useCallback, useEffect, useRef
//import * as microsoftTeams from "@microsoft/teams-js";
import { useData } from "@microsoft/teamsfx-react";
import { app, authentication } from "@microsoft/teams-js";
import Segment from "react-segment-analytics";

import TestAPIs from "../../../common/constants/TestAPIs"; //"../../../common/constants/TestApis";
import { TeamsFxContext } from "../../../common/models/Context"; //"../../../common/models/context";
import GetGeoLocation from "../../../common/components/GetGeoLocation";
import GetLocationWeb from "../../../common/components/GetLocationWeb";
import CaptureImage from "../../../common/components/CaptureImage";
import CaptureImageWeb from "../../../common/components/CaptureImageWeb";
import CaptureImageVideoApp from "../../../common/components/CaptureImageVideoApp";
import CaptureVideoWeb from "../../../common/components/CaptureVideoWeb";
import CaptureImgVideoWeb from "../../../common/components/CaptureImgVideoWeb";

function PersonalTabHome() {
  const [isWeb, setIsWeb] = useState(false);
  useEffect(() => {
    // initializing microsoft teams sdk
    app.initialize().then(() => {
      app.getContext().then((context: any) => {
        setTabContext(JSON.stringify(context));
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
  });

  //const inputRef = React.useRef();
  //const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  //const [utoken, setUToken] = useState("");
  //const [userInfo, setUserInfo] = useState({});
  //const [userName, setUserName] = useState("");
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

  const [tabContext, setTabContext] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { teamsUserCredential } = useContext(TeamsFxContext);

  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      //setUToken(teamsUserCredential.ssoToken.token);
      //console.log(`jbr-userInfo:${userInfo}`);
      //console.log(`jbr-ssoToken:${token}`);
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data!.displayName;

  // useEffect(() => {
  //   (async () => {
  //     if(teamsUserCredential) {
  //       try {
  //         const test = await teamsUserCredential.getToken(["User.Read"]);
  //         setToken(test?.token??'');
  //         const userInfo = await teamsUserCredential.getUserInfo();
  //         setUserInfo(userInfo);
  //         setUserName(userInfo!.displayName);
  //         setLoading(false);
  //       } catch (error) {
  //         setToken(JSON.stringify(error));
  //       }
  //     }
  //   })();
  // }, [teamsUserCredential]);

  // try {
  //   app.initialize();
  //   app.getContext().then((context) => {
  //     setTabContext(JSON.stringify(context));
  //     //return context;
  //   });
  // } catch (err) {
  //   //console.log(JSON.stringify(err));
  //   setErrorMsg(JSON.stringify(err));
  // }

  const handleTxtMsg = (e: { target: { value: string } }) => {
    setTxtMessage(e.target.value + "");
  };

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <h1>This is custom personal tab</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>Welcome{userName ? ", " + userName : ""}!</h2>
            <h3>Your app is running in personal tab.</h3>
            {data ? (
              <p>
                <strong>User context: {JSON.stringify(data)}</strong>
              </p>
            ) : (
              <></>
            )}
            <p>
              authentication.getAuthToken(): {token}
            </p>
            {teamsUserCredential ? (
              <p>
                <strong>
                  {" "}
                  teamsUserCredential: {JSON.stringify(
                    teamsUserCredential
                  )}{" "}
                </strong>
              </p>
            ) : (
              <></>
            )}
            {tabContext ? (
              <p>
                <strong> TabContext: {tabContext} </strong>
              </p>
            ) : (
              <></>
            )}
            {errorMsg ? <p>errorMsg: {errorMsg}</p> : <></>}
            <table>
              <tbody>
                <tr>
                  <td>Enter Text</td>
                  <td>:</td>
                  <td>
                    {/* <TextField label="With placeholder" placeholder="Please enter text here" onChange={handleTxtMsg} /> */}
                    <input
                      type="text"
                      value={txtMessage}
                      onChange={handleTxtMsg}
                      placeholder="Enter message here"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      disabled={isSending}
                      onClick={sendRequest}
                    >
                      Submit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>{responseMessage}</td>
                </tr>
                {isWeb ? (
                  <>
                    <tr>
                      <td colSpan={4}>
                        <Segment children={<GetLocationWeb />} writeKey={""} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <Segment children={<CaptureImageWeb teamId="team001" channelId="channel001" channelName="" createdBy="" token="" />} writeKey={""} />
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={4}>
                        <Segment children={<CaptureVideoWeb />} writeKey={""} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <Segment
                          children={<CaptureImgVideoWeb teamId={""} channelId={""} channelName={""} createdBy={""} token={""} />}
                          writeKey={""}
                        />
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td colSpan={4}>
                        <Segment children={<GetGeoLocation />} writeKey={""} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <Segment children={<CaptureImage />} writeKey={""} />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <Segment
                          children={<CaptureImageVideoApp />}
                          writeKey={""}
                        />
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default PersonalTabHome;
