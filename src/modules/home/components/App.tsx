// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  tokens,
} from "@fluentui/react-components";
import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { app, geoLocation } from "@microsoft/teams-js";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";

import Home from "./Home";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import NotFound from "./NotFound";

import { TeamsFxContext } from "../../../common/models/Context";
import TabConfig from "../../../common/constants/Constants"; //"./sample/lib/config";
import GroupTabHome from "../../group-tab/components/GroupTabHome";
import GroupTabConfig from "../../group-tab/components/GroupTabConfig";
import PersonalTabHome from "../../personal-tab/components/PersonalTabHome";
import PersonalTabConfig from "../../personal-tab/components/PersonalTabConfig";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { loading, theme, themeString, teamsUserCredential } =
    useTeamsUserCredential({
      initiateLoginEndpoint: TabConfig.initiateLoginEndpoint!,
      clientId: TabConfig.clientId!,
    });
  useEffect(() => {
    loading &&
      app.initialize().then(() => {
        // Hide the loading indicator.
        console.log("isSupported", geoLocation.isSupported());
        geoLocation.getCurrentLocation().then((result) => {
          console.log("getCurrentLocation", result);
        });
        app.notifySuccess();
      });
  }, [loading]);
  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential }}
    >
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {!loading && (
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route path="/notfound" element={<NotFound />} />

              <Route path="/grouptabhome" element={<GroupTabHome />} />
              <Route path="/grouptabconfig" element={<GroupTabConfig />} />
              <Route path="/personaltabhome" element={<PersonalTabHome />} />
              <Route
                path="/personaltabconfig"
                element={<PersonalTabConfig />}
              />

              <Route path="*" element={<Navigate to={"/home"} />}></Route>
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
