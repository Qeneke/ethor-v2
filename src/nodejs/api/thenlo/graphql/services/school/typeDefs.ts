import { gql } from "apollo-server-express";
import defaults, { createEdgeAndConnection } from "../../defaults";

export default gql`
  ${defaults}
  extend type Viewer implements Node @key(fields: "id") {
    id: ID! @external
    school: School
    schools(
      first: Int
      after: String
      last: Int
      before: String
    ): SchoolConnection @cost(multipliers: ["first", "last"])
  }

  type School implements Node {
    id: ID!
    name: String
  }
  ${createEdgeAndConnection("School")}
`;
