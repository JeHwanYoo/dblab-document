import React, { useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import QuillCursors from 'quill-cursors'

Quill.register('modules/cursors', QuillCursors)

interface Props {
  className?: string
  onChange?: (value: string) => void
  quill: React.LegacyRef<ReactQuill>
}

export function QuillEditor(props: Props) {
  const [value, setValue] = useState('')

  function handleOnChange(value: string) {
    setValue(value)
    props.onChange && props.onChange(value)
  }

  return (
    <ReactQuill
      ref={props.quill}
      modules={{
        cursors: true,
      }}
      className={props.className}
      theme="snow"
      value={value}
      onChange={handleOnChange}
    ></ReactQuill>
  )
}
