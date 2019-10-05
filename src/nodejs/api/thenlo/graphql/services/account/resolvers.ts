import {
  UserConnection,
  Resolvers,
  UserEdge
} from "@@graphql/thenlo/account.types";

const users = {
  pageInfo: {
    hasNextPage: true,
    hasPreviousPage: false,
    startCursor: "asd"
  },
  allInOne: {
    code: 200,
    success: true
  },
  edges: [
    {
      cursor: "1a",
      node: {
        id: "1",
        name: "Ada xd haha salam xd naban hahi hoho",
        username: "@ada"
      }
    },
    {
      cursor: "2a",
      node: {
        id: "2",
        name: "Alan Turing",
        username: "@complete"
      }
    }
  ],
  nodes: [
    {
      id: "1",
      name: "Ada xd haha salam xd naban hahi hoho",
      username: "@ada"
    },
    {
      id: "2",
      name: "Alan Turing",
      username: "@complete"
    }
  ]
};

const resolvers: Resolvers = {
  Viewer: {
    users(): UserConnection {
      console.log(users);
      return users;
    },
    user(): UserEdge {
      console.log(users);
      return users.edges[0];
    }
  }
};

export default resolvers;
