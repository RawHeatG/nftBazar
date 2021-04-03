import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import ProductListing from "./ProductListing";
import {DataProvider} from "./data-context"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DataProvider>
      <ProductListing />
    </DataProvider>
  </StrictMode>,
  rootElement
);
