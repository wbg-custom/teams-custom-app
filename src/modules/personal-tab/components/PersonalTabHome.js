import "../../../common/css/Tab.css";

import { Loader } from "@fluentui/react-northstar";
import { useContext, useState } from "react";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "../../../common/models/context";
import TestAPIs from "../../../common/constants/TestApis";
//import Scopes from "../../../common/constants/Scopes";

function PersonalTabHome() {
  const { teamsfx } = useContext(TeamsFxContext);
  const [ token, setToken ] = useState("");
  const [ responseMessage, setResponseMessage ] = useState("");
  const [ txtMessage, setTxtMessage ] = useState("");
  const { loading, data, error } = useData(async () => {
    if (teamsfx) {
      const userInfo = await teamsfx.getUserInfo();
      setToken(teamsfx.teamsUserCredential.ssoToken);
      //setToken(await teamsfx.getCredential().getToken(Scopes.LoginScope));
      console.log(`jbr-userInfo:${userInfo}`);
      console.log(`jbr-ssoToken:${token}`);
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data.displayName;

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

            {data ? (
              <p>
                <strong>User context: {JSON.stringify(data)}</strong>
              </p>
            ) : (
              <></>
            )}
            {token !== "" ? (
              <p>
                <strong>token: {token}</strong>
              </p>
            ) : (
              <></>
            )}

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

export default PersonalTabHome;
