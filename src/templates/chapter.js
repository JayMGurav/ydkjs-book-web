import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import { rhythm, scale } from "../utils/typography";

import SEO from "../components/seo";
import Layout from "../components/layout";
import { ThemeContext } from "../../theme.js";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const { themeColors } = useContext(ThemeContext);
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article style={{marginLeft:rhythm(1)}}>         
      {/* //remove left margin */}
        <header>
          <h1
            style={{
              ...scale(1.2),
              margin: `${rhythm(3 / 4)} 0`,
              // color: themeColors.fontColor,
              color:'#212121',
            }}
          >
            {post.frontmatter.title}
          </h1>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        {/* <footer>
          <Bio />
        </footer> */}
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(format: MARKDOWN)
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
