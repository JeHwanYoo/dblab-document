import React, { useEffect, useRef, useState } from 'react'
import { QuillEditor } from '../components/common/QuillEditor'
import type ReactQuill from 'react-quill'
import { createDocument, joinRoom, Document } from '../lib/connect'
import { QuillBinding } from 'y-quill'
import type { WebrtcProvider } from 'y-webrtc'
import { useLocation, useNavigate } from 'react-router-dom'
import { FormControl, InputLabel, OutlinedInput, Tooltip } from '@mui/material'
import { CloudOff, CloudQueue } from '@mui/icons-material'
import { uuidv4 } from 'lib0/random'

export function Editor() {
  const [provider, setProvider] = useState<WebrtcProvider | null>(null)
  const [doc, setDoc] = useState<Document | null>(null)
  const [filename, setFilename] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const component = useRef<ReactQuill>(null)

  useEffect(() => {
    const querystring = new URLSearchParams(location.search)
    const _filename = querystring.get('filename')

    if (!_filename) {
      navigate(`/editor?id=${uuidv4()}&filename=새문서`, { replace: true })
    }

    setFilename(_filename as string)

    return () => {
      provider?.disconnect()
      doc?.destroy()
    }
  }, [])

  useEffect(() => {
    if (filename === null) return

    const querystring = new URLSearchParams(location.search)
    const _filename = querystring.get('filename')
    const _id = querystring.get('id')

    if (!_id) {
      navigate('/notfound', { replace: true })
    }

    if (_filename && _filename !== filename) {
      const path = `/editor?id=${_id}&filename=${filename}`
      window.history.pushState({ path }, '', path)
    }

    if (!provider && !doc) {
      const editor = component?.current?.editor
      const _doc = createDocument(_id as string, _filename as string)
      const _provider: WebrtcProvider = joinRoom(_doc)

      new QuillBinding(_doc.getText('quill'), editor, _provider.awareness)

      _doc?.on('update', (message, origin, doc) => {
        const info = doc.getMap('info')
        const name = info.get('name')
        const clientId = info.get('eventFrom')

        if (_provider.awareness.clientID === clientId) return

        setFilename(name)
      })

      setProvider(_provider)
      setDoc(_doc)
    } else {
      const info = doc?.getMap('info')
      const name = info?.get('name')

      if (filename !== name) {
        info?.set('eventFrom', provider?.awareness.clientID)
        info?.set('name', filename)
      }
    }
  }, [filename])

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
              value={filename ?? ''}
              onChange={(event) => setFilename(event.target.value)}
            />
          </FormControl>
        </section>

        <QuillEditor className="my-4" quill={component} />
      </section>
    </section>
  )
}
