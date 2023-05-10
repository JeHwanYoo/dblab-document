import React, { useEffect, useRef, useState } from 'react'
import { QuillEditor } from '../components/common/QuillEditor'
import type ReactQuill from 'react-quill'
import { createDocument, joinRoom } from '../lib/connect'
import { QuillBinding } from 'y-quill'
import type { WebrtcProvider } from 'y-webrtc'

export function Editor() {
  const [provider, setProvider] = useState<WebrtcProvider | null>(null)
  const [connected, setConnected] = useState(false)
  const component = useRef<ReactQuill>(null)

  useEffect(() => {
    const editor = component?.current?.editor

    console.log(editor?.getModule('modules/cursors'))

    const doc = createDocument('sample')
    const provider: WebrtcProvider = joinRoom(doc)

    setProvider(provider)
    new QuillBinding(doc.instance.getText('quill'), editor, provider.awareness)

    return () => {
      if (provider) {
        provider.disconnect()
        doc.instance.destroy()
      }
    }
  }, [])

  useEffect(() => {
    setConnected(!!provider?.connected)
  }, [provider?.connected])

  return (
    <section>
      <header>
        <h1 className="text-4xl">Editor</h1>
      </header>
      <section>
        {/*<div>connected: {connected ? '✅' : '❌'}</div>*/}
        <QuillEditor className="my-8" quill={component} />
      </section>
    </section>
  )
}
