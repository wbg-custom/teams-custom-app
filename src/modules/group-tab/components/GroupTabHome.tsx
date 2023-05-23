import "../../../common/css/Tab.css";
//import { Loader, Input, Button } from "@fluentui/react-components";
import React, { useContext, useState, useCallback, useEffect, useRef } from "react"; //, useState
import { useData } from "@microsoft/teamsfx-react";
import { app } from "@microsoft/teams-js";

import TestAPIs from "../../../common/constants/TestAPIs"; //"../../../common/constants/TestApis";
import { TeamsFxContext } from "../../../common/models/Context";//"../../../common/models/context";

function GroupTabHome() {
  const [token, setToken] = useState("");
  const [txtMessage, setTxtMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const sendRequest = () => {
    if (isSending) return;
    // update state
    setIsSending(true);
    // send the actual request
    if (txtMessage === "") {
      setResponseMessage("Failed! First fill the text box.");
    } else {
      fetch(TestAPIs.TestAPIPostUrl, {
        method: "POST",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
          'Authorization': `'Bearer ${token}'`
        },
        body: JSON.stringify({
          Message: txtMessage
        }),
      })
        .then((response) => {
          setResponseMessage(JSON.stringify(response.json()));
          setIsSending(false);
        })
        .catch((err) => {
          setResponseMessage(`Response Error: ${err}`);
          setIsSending(false);
        });
    }
  }

  const [tabContext, setTabContext] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      //setToken(teamsUserCredential.teamsUserCredential.ssoToken);
      //console.log(`jbr-userInfo:${userInfo}`);
      //console.log(`jbr-ssoToken:${token}`);
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data!.displayName;

  try {
    app.initialize();
    app.getContext().then((context) => {
        setTabContext(JSON.stringify(context));
        //return context;
    });
  } catch (err) {
    //console.log(JSON.stringify(err));
    setErrorMsg(JSON.stringify(err));
  }

  const handleTxtMsg = (e: { target: { value: string; }; }) => {
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
            <h3>Your app is running in group tab.</h3>
            {data ? (
              <p>
                <strong>User context: {JSON.stringify(data)}</strong>
              </p>
            ) : (
              <></>
            )}
            {teamsUserCredential ? (
              <p>
                <strong> teamsUserCredential: {JSON.stringify(teamsUserCredential)} </strong>
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
                    <input type="text" value={txtMessage} onChange={handleTxtMsg} placeholder="Enter message here" />
                  </td>
                  <td>
                    <button type="button" disabled={isSending} onClick={sendRequest}>Submit</button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5}>{responseMessage}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default GroupTabHome;
