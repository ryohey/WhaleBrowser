export const basename = (path: string) =>
  path.split("/").pop().split(".").shift()
