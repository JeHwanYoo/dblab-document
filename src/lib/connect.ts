import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

export interface Document {
  name: string
  instance: Y.Doc
}

export function createDocument(name: string): Document {
  return {
    name,
    instance: new Y.Doc(),
  }
}

export function joinRoom(document: Document, wsOpts?: object) {
  return new WebrtcProvider(document.name, document.instance, wsOpts)
}
