export default (): boolean => {
  return process.env.NODE_ENV !== "production";
};
