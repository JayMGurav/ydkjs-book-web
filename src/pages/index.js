import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import { rhythm } from "../utils/typography";
import kebabCase from "lodash.kebabcase";
import { ThemeContext } from "../../theme.js";

import SEO from "../components/seo";
import Layout from "../components/layout";

const BookDiv = styled.div`
  width: ${rhythm(10)};
  margin: ${rhythm(1)} ${rhythm(0.5)};
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  -webkit-transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  -moz-transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  -o-transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background: ${props =>
    props.themeColors ? props.themeColors.secondaryBgColor : "#212121"};
  header {
    width: 100%;
    height: 100%;
    padding: ${rhythm(1)};
    h2 {
      overflow-wrap: break-word;
    }
  }
  p,
  small {
    color: ${props =>
      props.themeColors ? props.themeColors.fontColor : "#F0F3F5"};
  }
  span {
    margin-left: ${rhythm(0.8)};
    transition: all 0.2s ease-in-out;
  }
  :hover {
    transform: scale(1.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    span {
      margin-left: ${rhythm(1.2)};
    }
  }
`;

const BookSec = styled.div`
  width: 100%;
  min-height: 80vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const BlogIndex = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => {
  const { themeColors } = useContext(ThemeContext);
  const siteTitle = title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All Books" />
      <BookSec>
        {group.map((book, i) => {
          return (
            <BookDiv themeColors={themeColors} key={book.fieldValue}>
              <Link to={`/${kebabCase(book.fieldValue)}`}>
                <header>
                  <p>Kyle Simpson</p>
                  <h2
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    {book.fieldValue}
                  </h2>
                  <small>{book.totalCount} chapters</small>
                  <span>&rarr;</span>
                </header>
              </Link>
            </BookDiv>
          );
        })}
      </BookSec>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___book) {
        fieldValue
        totalCount
      }
    }
  }
`;
