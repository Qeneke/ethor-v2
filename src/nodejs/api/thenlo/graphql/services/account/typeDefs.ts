import { gql } from "apollo-server-express";
import defaults, { createEdgeAndConnection } from "../../defaults";

export default gql`
  ${defaults}
  extend type Viewer @key(fields: "id") {
    id: ID! @external
    users(limit: Int): UserConnection @cost(multipliers: ["limit"])
    user: UserEdge
  }
  extend type Mutation {
    signIn(username: String, email: String, password: String!): User
    signUp(username: String, email: String, password: String!): User
    signOut: User
  }

  type User implements Node @key(fields: "id") {
    id: ID!
    me: User
    username: String
    name(limit: Int): String @cost(multipliers: ["limit"])
    namea(limit: Int, first: Int): String @cost(multipliers: ["limit", "first"])
    surname: String
  }
  ${createEdgeAndConnection("User")}
`;
