import { gql } from "apollo-server-express";
import { first } from "../../defaults";

export default gql`
  ${first}
  extend type Query {
    viewer: Viewer
  }

  type Viewer implements Node @key(fields: "id") {
    id: ID!
  }
`;
