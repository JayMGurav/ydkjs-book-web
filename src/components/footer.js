import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import { rhythm } from "../utils/typography";
import { ThemeContext } from "../../theme.js";

import Layout from "../components/layout";

const Footer = () => {
  return (
    <div>
      <div>
        <p>
          all the above books are written by{" "}
          <a href="https://twitter.com/getify" rel="noopener noreferrer">
            Kyle Simpson
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
