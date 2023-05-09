import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface Props {
  className?: string
  onChange?: (value: string) => void
}

export function QuillEditor(props: Props) {
  const [value, setValue] = useState('')

  function handleOnChange(value: string) {
    setValue(value)
    props.onChange && props.onChange(value)
  }

  return (
    <ReactQuill
      className={props.className}
      theme="snow"
      value={value}
      onChange={handleOnChange}
    ></ReactQuill>
  )
}
