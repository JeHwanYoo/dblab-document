export type Tree = { [p: string]: Tree | Leaf }

export interface Leaf {
  id: string
  path: string
}

export function createEditorURL(leaf: Leaf, filename: string) {
  return `/editor?id=${leaf.id}&path=${leaf.path}&filename=${filename}`
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
