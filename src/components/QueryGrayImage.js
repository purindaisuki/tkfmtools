import { graphql, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";

const QueryGrayImage = (name) => {
  // query images
  const { allFile } = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          sourceInstanceName: { eq: "images" }
        }
      ) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                layout: FULL_WIDTH
                transformOptions: { grayscale: true }
              )
            }
            name
          }
        }
      }
    }
  `);

  return getImage(allFile.edges.find((i) => i.node.name === name).node);
};

export default QueryGrayImage;
