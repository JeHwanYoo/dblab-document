import React, { useEffect, useRef, useState } from 'react'
import { QuillEditor } from '../components/common/QuillEditor'
import type ReactQuill from 'react-quill'
import { createDocument, joinRoom } from '../lib/connect'
import { QuillBinding } from 'y-quill'
import type { WebrtcProvider } from 'y-webrtc'
import { useLocation } from 'react-router-dom'
import { FormControl, InputLabel, OutlinedInput, Tooltip } from '@mui/material'
import { CloudOff, CloudQueue } from '@mui/icons-material'

export function Editor() {
  const [provider, setProvider] = useState<WebrtcProvider | null>(null)
  const [filename, setFilename] = useState('')
  const location = useLocation()
  const component = useRef<ReactQuill>(null)

  useEffect(() => {
    const editor = component?.current?.editor
    const querystring = new URLSearchParams(location.search)
    const _filename = querystring.get('filename') as string

    setFilename(_filename)

    const doc = createDocument(_filename)
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

  return (
    <section>
      <section>
        <section className="px-1">
          {provider?.connected ? (
            <Tooltip title="connected">
              <CloudQueue color="success" />
            </Tooltip>
          ) : (
            <Tooltip title="disconnected">
              <CloudOff color="secondary" />
            </Tooltip>
          )}
        </section>
        <section className="my-4">
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">
              파일 이름
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              label="Amount"
              value={filename}
            />
          </FormControl>
        </section>

        <QuillEditor className="my-4" quill={component} />
      </section>
    </section>
  )
}
