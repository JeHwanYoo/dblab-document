import React from 'react'
import { Editor } from './Editor'
import { About } from './About'

export const routes = [
  {
    name: 'Editor',
    path: '/',
    element: <Editor />,
  },
  {
    name: 'About',
    path: '/about',
    element: <About />,
  },
]
