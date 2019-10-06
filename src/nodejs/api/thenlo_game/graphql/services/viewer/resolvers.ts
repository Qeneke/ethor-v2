import { Viewer, Resolvers } from "@@graphql/thenlo_game/viewer.types";

const resolvers: Resolvers = {
  Query: {
    viewer(): Viewer {
      return { id: "asd" };
    }
  }
};

export default resolvers;
