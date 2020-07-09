import React, { useContext } from "react";
import { Link } from "gatsby";
import styled, { createGlobalStyle } from "styled-components";
import { rhythm, scale } from "../utils/typography";
import { ThemeContext } from "../../theme.js";

import ModeBtn from "./modeBtn.js";

const GlobalStyle = createGlobalStyle`
  body {
    scroll-behavior: smooth;
    color: ${props =>
      props.themeColors ? props.themeColors.fontColor : "#F0F3F5"};
      background: ${props =>
        props.themeColors ? props.themeColors.bgColor : "#121212"};
        font-size: 14px;
        *+*{
          margin:0;
        }
  }
  p{
    color: ${props =>
      props.themeColors ? props.themeColors.fontColor : "#F0F3F5"};
      margin: ${rhythm(3/4)} 0;
  }
  h1,h2,h3,h4,h5,h6,span,a{
    color: ${props =>
      props.themeColors ? props.themeColors.fontColor : "#a07af8"};
      color:#121212;
  }
  blockquote{
    border-left: 6px solid ${props =>
      props.themeColors ? props.themeColors.primaryColor : "#a07af8"};
    color: ${props =>
      props.themeColors ? props.themeColors.primaryColor : "#a07af8"};
  }
  img{
    border:none;
    border-radius:8px;
  }
  ::-webkit-scrollbar {
    width: 3px;
    // height: 3px;
    cursor: pointer;
    scroll-behavior: smooth;
  }
  ::-webkit-scrollbar-thumb {
      background: ${props =>
        props.themeColors ? props.themeColors.fontColor : "#F0F3F5"};
      border-radius: 10px;
  }
`;

const HeaderDiv = styled.div`
  padding: 0;
  margin-bottom: ${rhythm(1)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Layout = ({ location, title, children }) => {
  const { themeColors } = useContext(ThemeContext);
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <HeaderDiv>
        <h1
          style={{
            ...scale(1.1),
            margin: 0,
            color: `${themeColors.primaryColor}`,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
        <ModeBtn />
      </HeaderDiv>
    );
  } else {
    header = (
      <HeaderDiv>
        <h2
          style={{
            margin: 0,
            fontFamily: `Montserrat, sans-serif`,
            color: `${themeColors.primaryColor}`,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h2>
        <ModeBtn />
      </HeaderDiv>
    );
  }
  return (
    <>
      <GlobalStyle themeColors={themeColors} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: `${rhythm(1.5)}`,
        }}
      >
        <header>{header}</header>
        <main style={{ width: "100%" }}>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

export default Layout;
