export const getEnvironments = () => {
  if (typeof process !== "undefined") {
    return { ...process.env };
  } else {
    
    return { ...import.meta.env };
  }
};
