import "../../../common/css/Tab.css";
import { Loader, Input, Button } from "@fluentui/react-northstar";
import { useContext, useState, useCallback, useEffect, useRef } from "react"; //, useState
import { useData } from "@microsoft/teamsfx-react";
import { app, Context } from "@microsoft/teams-js";

import TestAPIs from "../../../common/constants/TestApis";
import { TeamsFxContext } from "../../../common/models/context";

function GroupTabHome() {
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const isMounted = useRef(true);
  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  const sendRequest = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) return;
    // update state
    setIsSending(true);
    // send the actual request
    if (txtMessage === "") {
      setResponseMessage("Failed! First fill the text box.");
    } else {
      await fetch(TestAPIs.PostFeedbackUrl, {
        method: "POST",
        headers: {
          'Accept': "application/json",
          "Content-Type": "application/json",
          'Authorization': `'Bearer ${token}'`
        },
        body: JSON.stringify({
          Name: "test call",
          Email: "text email",
          Message: txtMessage
        }),
      })
        .then((response) => {
          setResponseMessage(response.json());
        })
        .catch((err) => {
          setResponseMessage(`Response Error: ${err}`);
        });
    }
    // once the request is sent, update state again
    if (isMounted.current)
      // only update if we are still mounted
      setIsSending(false);
  }, [isSending]); // update the callback if the state changes

  const [tabContext, setTabContext] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const { teamsfx } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsfx) {
      const userInfo = await teamsfx.getUserInfo();
      setToken(teamsfx.teamsUserCredential.ssoToken);
      //console.log(`jbr-userInfo:${userInfo}`);
      //console.log(`jbr-ssoToken:${token}`);
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data.displayName;

  try {
    app.initialize();
    app.getContext().then((context) => {
      setTabContext(context);
    });
  } catch (err) {
    //console.log(JSON.stringify(err));
    setErrorMsg(JSON.stringify(err));
  }

  const [token, setToken] = useState("");
  const [txtMessage, setTxtMessage] = useState("");

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <h1>This is custom group tab</h1>
        {loading ? (
          <Loader style={{ margin: 100 }} />
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
            {teamsfx ? (
              <p>
                <strong> teamsfx: {JSON.stringify(teamsfx)} </strong>
              </p>
            ) : (
              <></>
            )}
            {tabContext ? (
              <p>
                <strong> TabContext: {JSON.stringify(tabContext)} </strong>
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
                  <Input clearable onChange={(event, search) =>{
                      setTxtMessage(search.value);
                      event.stopPropagation();
                    }}/>
                  </td>
                  <td>
                    <Button content="Submit Text" Click={sendRequest} />
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">{responseMessage}</td>
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
