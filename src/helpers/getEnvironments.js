export const getEnvironments = () => {
  if (typeof process !== "undefined") {
    return { ...process.env}
  } else {
    import.meta.env
    return { ...import.meta.env}
  }
}