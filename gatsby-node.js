const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const kebabCase = require("lodash.kebabcase");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const chapterTemplate = path.resolve(`./src/templates/chapter.js`);
  const bookTemplate = path.resolve(`./src/templates/book.js`);

  const result = await graphql(
    `
      {
        chapterRemark: allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }

        booksGroup: allMarkdownRemark(limit: 1000) {
          group(field: frontmatter___book) {
            fieldValue
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog chapters pages.
  const chapters = result.data.chapterRemark.edges;

  chapters.forEach((chapter, index) => {
    const previous =
      index === chapters.length - 1 ? null : chapters[index + 1].node;
    const next = index === 0 ? null : chapters[index - 1].node;

    createPage({
      path: chapter.node.fields.slug,
      component: chapterTemplate,
      context: {
        slug: chapter.node.fields.slug,
        previous,
        next,
      },
    });
  });

  // extract book data from query
  // use bookTemplate to create page for each book
  const books = result.data.booksGroup.group;

  books.forEach(book => {
    createPage({
      path: `/${kebabCase(book.fieldValue)}/`,
      component: bookTemplate,
      context: {
        book: book.fieldValue,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNodesByType, actions, getNode }) => {
  const { createParentChildLink, createNodeField } = actions;
  if (node.internal.type === "Directory") {
    if (node.sourceInstanceName === "chapters") {
      const parentDirectory = path.normalize(node.dir + "/");
      const parent = getNodesByType("Directory").find(
        n => path.normalize(n.absolutePath + "/") === parentDirectory
      );
      if (parent) {
        node.parent = parent.id;
        createParentChildLink({
          child: node,
          parent: parent,
        });
      }
    }
  }
  if (node.internal.type === `MarkdownRemark`) {
    const filePath = createFilePath({
      node,
      getNode,
      trailingSlash: false,
    });
    //split and convert to kebabCase
    const { 1: book, 2: chapter } = filePath.split("/");
    const slug = `${kebabCase(book)}/${kebabCase(chapter)}`;
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });
  }
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode });
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     });
//   }
// };
