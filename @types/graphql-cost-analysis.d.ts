declare module "graphql-cost-analysis" {
  const costAnalysis: (opts?: {
    variables: string;
    maximumCost: number;
    defaultCost: number;
    onComplete(cost: number): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) => any;
  export default costAnalysis;
}
