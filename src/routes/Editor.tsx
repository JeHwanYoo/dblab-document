import React from 'react'
import { QuillEditor } from '../components/common/QuillEditor'

export function Editor() {
  return (
    <section>
      <header>
        <h1 className="text-4xl">Editor</h1>
      </header>
      <section>
        <QuillEditor className="my-8" />
      </section>
    </section>
  )
}
