import React from 'react'
import { TreeView } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import merge from 'deepmerge'
import { uuidv4 } from 'lib0/random'

interface Item {
  id: string
  name: string
}

const items: Item[] = [
  {
    id: uuidv4(),
    name: '부동산 리포트/11월/report-1',
  },
  {
    id: uuidv4(),
    name: '부동산 리포트/11월/report-2',
  },
  {
    id: uuidv4(),
    name: '부동산 리포트/12월/report',
  },
]

export function Finder() {
  const navigate = useNavigate()
  let root: Record<string, object> = {}

  function parseDepth(items: Item[]) {
    for (const item of items) {
      const tree: Record<string, object> = {}
      const parsed = item.name.split('/')
      let prevDirectory: string | undefined

      for (const directory of parsed.slice(0, -1)) {
        if (prevDirectory) {
          tree[prevDirectory] = merge(tree[prevDirectory], { [directory]: {} })
        } else {
          tree[directory] = {}
        }
        prevDirectory = directory
      }

      if (prevDirectory) {
        tree[prevDirectory] = {
          [parsed.at(-1) as string]: { id: item.id },
        }
      }

      root = merge(root, tree)
    }
  }

  parseDepth(items)

  console.log(root)

  return (
    <TreeView>
      {Object.entries(root).map((item) => {
        if (item) {
          return (
            <></>
            // <TreeItem
            //   key={item}
            //   nodeId={item}
            //   label="sample"
            //   icon={<Article />}
            //   onClick={() =>
            //     navigate('/editor', { state: { filename: 'sample' } })
            //   }
            // />
          )
        } else {
          return <p key={item}>good</p>
        }
      })}
      {/*<TreeItem*/}
      {/*  nodeId="1"*/}
      {/*  label="folder"*/}
      {/*  collapseIcon={<FolderOpen />}*/}
      {/*  expandIcon={<Folder />}*/}
      {/*>*/}
      {/*  <TreeItem*/}
      {/*    nodeId="2"*/}
      {/*    label="sample"*/}
      {/*    icon={<Article />}*/}
      {/*    onClick={() => navigate('/editor', { state: { filename: 'sample' } })}*/}
      {/*  />*/}
      {/*</TreeItem>*/}
    </TreeView>
  )
}
