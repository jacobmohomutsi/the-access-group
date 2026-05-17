import { gql } from "graphql-request";

export const HOME_QUERY = gql`
  {
    page(id: "the-access-group", idType: URI) {
      title
      content

      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;