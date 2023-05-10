import React from 'react'
import { TreeItem, TreeView } from '@mui/lab'
import { Article, Folder, FolderOpen } from '@mui/icons-material'

const json = [{ name: 'hello' }, { name: 'world' }]

export function Finder() {
  return (
    <TreeView>
      <TreeItem
        nodeId="1"
        label="folder"
        collapseIcon={<FolderOpen />}
        expandIcon={<Folder />}
      >
        <TreeItem nodeId="2" label="file" icon={<Article />} />
      </TreeItem>
    </TreeView>
  )
}
