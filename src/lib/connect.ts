import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

export function createDocument(id: string, path: string, name: string): Y.Doc {
  const doc = new Y.Doc()
  const info = doc.getMap('info')
  info.set('id', id)
  info.set('path', path)
  info.set('name', name)
  return doc
}

export function joinRoom(document: Y.Doc, wsOpts?: object) {
  const info = document.getMap('info')
  const id = info.get('id') as string

  return new WebrtcProvider(id, document, wsOpts)
}

export type Document = Y.Doc
