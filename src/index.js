import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import {DataProvider} from "./data-context"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>,
  rootElement
);
