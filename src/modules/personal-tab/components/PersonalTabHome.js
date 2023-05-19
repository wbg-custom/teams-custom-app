import "../../../common/css/Tab.css";
import { Loader } from "@fluentui/react-northstar";
import { useContext, useState } from "react"; //, useState
import { useData } from "@microsoft/teamsfx-react";
import { app, Context } from "@microsoft/teams-js";

import TestAPIs from "../../../common/constants/TestApis";
import { TeamsFxContext } from "../../../common/models/context";

function GroupTabHome() {
  const [tabContext, setTabContext] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const { teamsfx } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsfx) {
      const userInfo = await teamsfx.getUserInfo();
      setToken(teamsfx.teamsUserCredential.ssoToken);
      console.log(`jbr-userInfo:${userInfo}`);
      console.log(`jbr-ssoToken:${token}`);
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data.displayName;

  try{
    app.initialize();
    app.getContext().then((context) => {
      setTabContext(context);
    });
  }
  catch(err){
    console.log(JSON.stringify(err));
    setErrorMsg(JSON.stringify(err));
  }

  const [ token, setToken ] = useState("");
  const [ responseMessage, setResponseMessage ] = useState("");
  const [ txtMessage, setTxtMessage ] = useState("");

  async function btnTestApiClick() {
    if(txtMessage === "") {
      alert("First fill the text box.");
      return;
    }
    try {
      await fetch(TestAPIs.PostFeedbackUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `'Bearer ${token}'`,
        },
        body: JSON.stringify({
          Name: "test call",
          Email: "text email",
          Message: "text message",
        }),
      }).then(response => {
        setResponseMessage(response.json());
      }).catch((err) =>{
        setResponseMessage( `Response Error: ${err}`);  
      });
    } catch (err) {
      //var errMsg = JSON.stringify(err);
      setResponseMessage( `Catch Error: ${err}`);
    }
  }

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <h1>This is custom personal tab</h1>
        {loading ? (
          <Loader style={{ margin: 100 }} />
        ) : (
          <>
            <h2>Welcome{userName ? ", " + userName : ""}!</h2>
            <h3>Your app is running in personal tab.</h3>
              {
                data ? ( <p><strong>User context: {JSON.stringify(data)}</strong></p> ) : (<></>)
              }
              {
                teamsfx ? ( <p><strong> teamsfx: {JSON.stringify(teamsfx)} </strong></p> ):(<></>)
              }
              {
                tabContext ? ( <p><strong> TabContext: {JSON.stringify(tabContext)} </strong></p> ):(<></>)
              }
              {
                errorMsg ? ( <p>errorMsg: {errorMsg}</p>) : (<></>)
              }
            <table>
              <tbody>
                <tr>
                  <td>Enter Text</td><td>:</td>
                  <td><input type="Text" value={txtMessage} onChange={(e) => {setTxtMessage(e.target.value)}} /></td>
                  <td>
                    <button id="btnTestApi" type="button" onClick={btnTestApiClick}>
                      Submit Text
                    </button>
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
