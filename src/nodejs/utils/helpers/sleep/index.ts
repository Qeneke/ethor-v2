export default (ms: number): Promise<void> => {
  return new Promise((resolve): void => {
    setTimeout(resolve, ms);
  });
};
