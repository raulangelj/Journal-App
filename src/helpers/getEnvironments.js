export const getEnvironments = () => {
  if (typeof process !== "undefined") {
    return { ...process.env}
  } else {
    try {
      import.meta.env
      return { ...import.meta.env}
    } catch (error) {}
  }
}