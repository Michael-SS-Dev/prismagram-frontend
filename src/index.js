import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import Client from "./Apollo/Client";
import { ApolloProvider } from "react-apollo-hooks";

ReactDOM.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
// Appijs에서 ApolloProvider를 옮기는 이유?
// query를 나중에 실행하도록 하기 위함
