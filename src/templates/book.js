import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import { rhythm } from "../utils/typography";
import styled from "styled-components";

import SEO from "../components/seo";
import Layout from "../components/layout";
import { ThemeContext } from "../../theme.js";

const ChapterDiv = styled.div`
  background: ${props =>
    props.themeColors ? props.themeColors.secondaryBgColor : "#F0F3F5"};
  width: 100%;
  margin: ${rhythm(1.5)} 0;
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  -webkit-transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  -moz-transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  -o-transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  span {
    margin-left: ${rhythm(0.8)};
    transition: all 0.2s ease-in-out;
  }

  :hover {
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    span {
      margin-left: ${rhythm(1.2)};
    }
  }
`;

const ChapterContentDiv = styled.div`
  height: 100%;
  width: 100%;
  padding: ${rhythm(1)};
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  h3 {
    margin-top: 0;
  }
  ${"" /* p {
    color: #fff;
  } */}
`;

const Book = ({ pageContext, data, location }) => {
  const { themeColors } = useContext(ThemeContext);
  const { book } = pageContext;
  const siteTitle = data.site.siteMetadata.title;
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={book}
        description={`Like other books in this series, You Don't Know JS: ${book} dives into trickier parts of the language that many JavaScript programmers simply avoid. Armed with this knowledge, you can become a true JavaScript master.`}
      />
      <div>
        <h1 style={{ marginBottom: rhythm(1.5) }}>Table of content</h1>
        <div>
          {edges.map(({ node }, i) => {
            const { excerpt } = node;
            const { slug } = node.fields;
            console.log(slug);
            const { title } = node.frontmatter;
            return (
              <ChapterDiv key={slug} themeColors={themeColors}>
                <Link to={`/${slug}`}>
                  <ChapterContentDiv>
                    <h3>
                      Chapter {i + 1} : {title}
                    </h3>
                    <p>
                      {excerpt}
                      <span>&rarr;</span>
                    </p>
                  </ChapterContentDiv>
                </Link>
              </ChapterDiv>
            );
          })}
        </div>
        <Link to="/">All Books &rarr;</Link>
      </div>
    </Layout>
  );
};

export default Book;

export const pageQuery = graphql`
  query($book: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: frontmatter___book }
      filter: { frontmatter: { book: { eq: $book } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            # tableOfContent
          }
          excerpt
        }
      }
    }
  }
`;
