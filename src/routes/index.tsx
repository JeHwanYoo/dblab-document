import React from 'react'
import { Editor } from './Editor'
import { About } from './About'
import { Finder } from './Finder'
import { EditNote, Info, Search } from '@mui/icons-material'

export const routes = [
  {
    name: 'Finder',
    path: '/',
    element: <Finder />,
    icon: <Search />,
  },
  {
    name: 'Editor',
    path: '/editor',
    element: <Editor />,
    icon: <EditNote />,
  },
  {
    name: 'About',
    path: '/about',
    element: <About />,
    icon: <Info />,
  },
]
