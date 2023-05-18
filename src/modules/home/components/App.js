import '../../../common/css/App.css';
import { Provider, teamsTheme, Loader } from "@fluentui/react-northstar";//,Loader
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { Navigate } from "react-router-dom";
import { useTeamsFx } from "@microsoft/teamsfx-react";
//import { useTeams } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import NotFound from "./NotFound";
import PersonalTabConfig from '../../personal-tab/components/PersonalTabConfig';
import PersonalTabHome from '../../personal-tab/components/PersonalTabHome';
import TabConfig from "../../../common/constants/contants";
import { TeamsFxContext } from "../../../common/models/context";
import GroupTabConfig from '../../group-tab/components/GroupTabConfig';
import GroupTabHome from '../../group-tab/components/GroupTabHome';

// function App() {
//   const { loading, theme, themeString, teamsfx } = useTeamsFx({
//     initiateLoginEndpoint: TabConfig.initiateLoginEndpoint,
//     clientId: TabConfig.clientId,
//   });
//   return (
// <TeamsFxContext.Provider value={{theme, themeString, teamsfx}}>
// <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>
//   <Router>
//     <Routes>
//       <Route exact path="/privacy" component={Privacy} />
//       <Route exact path="/termsofuse" component={TermsOfUse} />
//       <Route exact path="/personaltabconfig" component={PersonalTabConfig} />
//       <Route exact path="/personaltabhome" component={PersonalTabHome} />
//     </Routes>
//   </Router>
// </Provider>
// </TeamsFxContext.Provider>
//   );
// }
// export default App;


export default function App() {
  const { loading, theme, themeString, teamsfx } = useTeamsFx({
    initiateLoginEndpoint: TabConfig.initiateLoginEndpoint,
    clientId: TabConfig.clientId,
  });
  return (
    <TeamsFxContext.Provider value={{theme, themeString, teamsfx}}>
      <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>
        <Router>
          {loading ? (
            <Loader style={{ margin: 100 }} />
          ) : (
            <Routes>
              <Route exact path="/" element={<PersonalTabHome/>} />
              <Route exact path="/privacy" element={<Privacy/>} />
              <Route exact path="/termsofuse" element={<TermsOfUse/>} />
              <Route exact path="/notfound" element={<NotFound/>} />
              <Route exact path="/personaltabconfig" element={<PersonalTabConfig/>} />
              <Route exact path="/personaltabhome" element={<PersonalTabHome/>} />
              <Route exact path="/grouptabconfig" element={<GroupTabConfig/>} />
              <Route exact path="/grouptabhome" element={<GroupTabHome/>} />
            </Routes>
          )}
        </Router>
      </Provider>
    </TeamsFxContext.Provider>
  );
}

