import {
  SchoolConnection,
  Resolvers,
  School
} from "@@graphql/thenlo_game/school.types";

const schools = {
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: true
  },
  allInOne: {
    success: true
  },
  edges: [
    {
      cursor: "1a",
      node: {
        id: "d",
        name: "Ada xd",
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
  ]
};

const resolvers: Resolvers = {
  Viewer: {
    schools(_): SchoolConnection {
      console.log(_);
      return schools;
    },
    school(_): School {
      console.log(_);
      return schools.edges[0].node;
    }
  }
};

export default resolvers;
