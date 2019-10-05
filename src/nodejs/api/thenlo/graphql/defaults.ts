import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

const Inode = gql`
  interface Node {
    id: ID!
  }
`;
const IpageInfo = gql`
  interface IpageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
`;
const IallInOne = gql`
  interface IallInOne {
    code: Int
    message: String
    success: Boolean!
  }
`;
const TpageInfo = gql`
  type PageInfo implements IpageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
`;
const TallInOne = gql`
  type AllInOne implements IallInOne {
    code: Int
    message: String
    success: Boolean!
  }
`;
const Dcost = gql`
  directive @cost(
    complexity: Int
    useMultipliers: Boolean
    multipliers: [String] = ["first"]
  ) on OBJECT | FIELD_DEFINITION
`;

export const first = gql`
  ${Dcost}
  ${Inode}
  ${IpageInfo}
  ${IallInOne}
  ${TpageInfo}
  ${TallInOne}
`;
export default gql`
  ${Dcost}
  ${Inode}
  ${IpageInfo}
  ${IallInOne}
  ${TpageInfo}
  ${TallInOne}
`;
export const createEdgeAndConnection = (typeName: string): DocumentNode => {
  return gql`
    type ${typeName}Connection {
      edges: [${typeName}Edge]
      pageInfo: PageInfo!
      allInOne: AllInOne!
      totalCount: Int
      nodes: [${typeName}]
    }
    type ${typeName}Edge @key(fields: "cursor") {
      cursor: String!
      node: ${typeName}
    }
  `;
};
