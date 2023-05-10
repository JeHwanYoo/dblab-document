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
import { createEditorURL } from '../lib/util'

export function Editor() {
  const [provider, setProvider] = useState<WebrtcProvider | null>(null)
  const [doc, setDoc] = useState<Document | null>(null)
  const [filename, setFilename] = useState<string | null>(null)
  const [filepath, setFilepath] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const component = useRef<ReactQuill>(null)

  useEffect(() => {
    const querystring = new URLSearchParams(location.search)
    const _filename = querystring.get('filename')
    const _path = querystring.get('path')

    if (!_filename) {
      const uuid = uuidv4()
      navigate(createEditorURL({ id: uuid, path: '' }, '새문서' + uuid), {
        replace: true,
      })

      setFilepath('')
    }

    setFilename(_filename as string)
    setFilepath(_path)

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
    const _path = querystring.get('path')

    if (!_id) {
      navigate('/notfound', { replace: true })
    }

    if (_filename && _filename !== filename) {
      const path = createEditorURL(
        { id: _id as string, path: _path as string },
        filename
      )
      window.history.pushState({ path }, '', path)
    }

    if (!provider && !doc) {
      const editor = component?.current?.editor
      const _doc = createDocument(
        _id as string,
        _path as string,
        _filename as string
      )
      const _provider: WebrtcProvider = joinRoom(_doc)

      new QuillBinding(_doc.getText('quill'), editor, _provider.awareness)

      _doc?.on('update', (_, __, doc) => {
        const info = doc.getMap('info')
        const _name = info.get('name')
        const _path = info.get('path')
        const renameFilenameId = info.get('rename:filename')
        const renamePathId = info.get('rename:path')

        if (
          renameFilenameId &&
          _provider.awareness.clientID !== renameFilenameId
        ) {
          setFilename(_name)
        }

        if (renamePathId && _provider.awareness.clientID !== renamePathId) {
          setFilepath(_path)
        }
      })

      setProvider(_provider)
      setDoc(_doc)
    } else {
      const info = doc?.getMap('info')
      const _name = info?.get('name')

      if (filename !== _name) {
        info?.set('rename:filename', provider?.awareness.clientID)
        info?.set('name', filename)
      }
    }
  }, [filename])

  useEffect(() => {
    const info = doc?.getMap('info')
    const _path = info?.get('path')

    if (filepath !== _path) {
      info?.set('rename:path', provider?.awareness.clientID)
      info?.set('path', filepath)
    }
  }, [filepath])

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
            <InputLabel htmlFor="outlined-filename">파일 이름</InputLabel>
            <OutlinedInput
              id="outlined-filename"
              label="filename"
              value={filename ?? ''}
              onChange={(event) => setFilename(event.target.value)}
            />
          </FormControl>
        </section>
        <section className="my-4">
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-filename">파일 경로</InputLabel>
            <OutlinedInput
              id="outlined-path"
              label="path"
              value={filepath ?? ''}
              onChange={(event) => setFilepath(event.target.value)}
            />
          </FormControl>
        </section>

        <QuillEditor className="my-4" quill={component} />
      </section>
    </section>
  )
}
