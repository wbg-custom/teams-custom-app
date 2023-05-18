import "../../../common/css/Tab.css";
import { Loader } from "@fluentui/react-northstar";
import { useContext } from "react"; //, useState
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "../../../common/models/context";

function PersonalTabHome() {
  const { teamsfx } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsfx) {
      const userInfo = await teamsfx.getUserInfo();
      console.log(`jbr-userInfo:${userInfo}`);
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data.displayName;
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
          <p>
              {
                data ? (<strong>User context: {JSON.stringify(data)}</strong>) : (<></>)
              }
            </p>
            <table>
              <tr>
                <td>Enter Text</td>
                <td>:</td>
                <td><input type="Text" /> </td>
                <td><button id="btn" type="button">Submit Text</button></td>
              </tr>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default PersonalTabHome;
