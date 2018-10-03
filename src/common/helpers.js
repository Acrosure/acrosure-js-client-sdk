export const isBrowser = () => {
  return window && window.document
}

export const isNode = () => {
  return process && process.versions && process.versions.node
}
