import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./App";
import { AuthProvider, DataProvider } from "./Contexts";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <DataProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DataProvider>
    </Router>
  </StrictMode>,
  rootElement
);
