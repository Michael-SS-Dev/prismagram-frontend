import React, { Component } from "react";
// grapbql 태그
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";
import Footer from "./Footer";

// @client는 client 쿼리라는 것을 나타냄
// @client안하면 아래 쿼리를 API로 보내려 할 것임
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <GlobalStyles />
        <Router isLoggedIn={isLoggedIn} />
        <Footer />
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </Wrapper>
    </ThemeProvider>
  );
};
