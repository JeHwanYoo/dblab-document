import React, { useEffect, useRef, useState } from 'react'
import { TreeItem, TreeView } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { uuidv4 } from 'lib0/random'
import { Article, Folder, FolderOpen } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'

interface Item {
  id: string
  name: string
}

type Tree = { [p: string]: Tree | string }

const mockItems: Item[] = [
  {
    id: uuidv4(),
    name: '부동산 리포트/11월/report-1.md',
  },
  {
    id: uuidv4(),
    name: '부동산 리포트/11월/report-2.md',
  },
  {
    id: uuidv4(),
    name: '부동산 리포트/12월/report.md',
  },
]

export function Finder() {
  const [items, setItems] = useState<Item[]>([])
  const [root, setRoot] = useState<Tree>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  function parseDepth(items: Item[]) {
    return items.reduce((acc, item) => {
      const nameParts = item.name.split('/')
      let nestedObj: Tree = acc
      nameParts.forEach((part, index) => {
        if (index === nameParts.length - 1) {
          nestedObj[part] = item.id
        } else {
          nestedObj[part] = nestedObj[part] || {}
          nestedObj = nestedObj[part] as Tree
        }
      })
      return acc
    }, {})
  }

  function renderTree(root: Tree) {
    return Object.keys(root).map((key) => {
      const value = root[key]
      if (typeof value === 'object') {
        return (
          <TreeItem
            key={key}
            nodeId={key}
            label={key}
            collapseIcon={<FolderOpen />}
            expandIcon={<Folder />}
          >
            {renderTree(value)}
          </TreeItem>
        )
      }

      return (
        <TreeItem
          key={key}
          nodeId={key}
          label={key}
          icon={<Article />}
          onClick={() => navigate(`/editor?filename=${key}`)}
        />
      )
    })
  }

  useEffect(() => {
    ;(async function fetchItems() {
      // TODO GET LIST from S3
      setIsLoading(true)

      await (function delay() {
        return new Promise((resolve) => setTimeout(resolve, 500))
      })()

      setIsLoading(false)
      setItems(mockItems)
    })()
  }, [])

  useEffect(() => {
    setRoot(parseDepth(items))
  }, [items])

  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress />
      </div>
    )
  }

  if (Object.keys(root).length === 0) {
    return <p className="text-center">조회된 문서가 없습니다</p>
  } else {
    return <TreeView>{renderTree(root)}</TreeView>
  }
}
