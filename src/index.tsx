import React from "react";
import ReactDOM from "react-dom/client";
import "./common/css/index.css";
import App from "./modules/home/components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {
  FluentProvider as FluentUIProvider,
  teamsLightTheme as rteamsTheme,
} from "@fluentui/react-components";
import {
  Provider as NorthstarUIProvider,
  teamsTheme,
} from "@fluentui/react-northstar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NorthstarUIProvider theme={teamsTheme}>
      <FluentUIProvider theme={rteamsTheme}>
        <Provider store={store}>
          <App />
        </Provider>
      </FluentUIProvider>
    </NorthstarUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
