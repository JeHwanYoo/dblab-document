import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Breadcrumbs,
  CircularProgress,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { lsWithDepth } from '../lib/aws'
import { FileSystem } from '../API'
import { Folder, InsertDriveFile } from '@mui/icons-material'

export function Finder() {
  const [items, setItems] = useState<FileSystem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState<string | null>(null)
  const [depth, setDepth] = useState<number | null>(null)
  const [pageSize, setPageSize] = useState<number | null>(10)
  const [nextToken, setNextToken] = useState<string | null | undefined>(null)
  const navigate = useNavigate()
  const location = useLocation()

  async function fetchItems() {
    setIsLoading(true)

    try {
      const _items = await lsWithDepth(
        depth ?? 0,
        name ?? '',
        pageSize ?? 10,
        nextToken ?? undefined
      )
      setItems(_items || [])
    } catch (e) {
      console.log(e)
    }

    setIsLoading(false)
  }

  function search(
    _depth: number,
    _name: string,
    _pageSize: number,
    _nextToken?: string
  ) {
    const querystring = new URLSearchParams(location.search)

    querystring.set('depth', String(_depth))
    querystring.set('name', _name)
    querystring.set('pageSize', String(_pageSize))
    if (nextToken) querystring.set('nextToken', _nextToken ?? '')

    navigate(`/?${querystring.toString()}`)
  }

  function openFile(_id: string, _path: string, _filename: string) {
    navigate(`/editor?id=${_id}&filename=${_filename}&path=${_path}`)
  }

  useEffect(() => {
    const querystring = new URLSearchParams(location.search)

    const _depth = querystring.has('depth')
      ? Number(querystring.get('depth'))
      : null
    const _name = querystring.get('name')
    const _pageSize = querystring.has('pageSize')
      ? Number(querystring.get('pageSize'))
      : null
    const _nextToken = querystring.get('nextToken')

    if (_depth === null || _name === null || _pageSize === null) {
      navigate(`/?depth=0&name=/&pageSize=10`)
      return
    }

    setDepth(_depth)
    setName(_name)
    setPageSize(_pageSize)
    setNextToken(_nextToken ? _nextToken : undefined)
  }, [])

  useEffect(() => {
    ;(async () => {
      await fetchItems()
    })()
  }, [depth, name, pageSize, nextToken])

  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        {name?.split('/').map((item, index) => (
          <Typography
            key={index}
            className="cursor-pointer"
            color="text.primary"
            onClick={() =>
              search(
                index,
                name
                  ?.split('/')
                  .slice(0, index + 1)
                  .join('/'),
                pageSize ?? 10,
                nextToken ?? undefined
              )
            }
          >
            {item}
          </Typography>
        ))}
      </Breadcrumbs>
      <List dense={false}>
        {items.map((item: FileSystem) => (
          <ListItemButton
            key={item.name}
            onClick={() =>
              item.isDirectory
                ? search(
                    item.depth + 1,
                    item.name,
                    pageSize ?? 10,
                    nextToken ?? undefined
                  )
                : openFile(
                    item.id,
                    item.name.split('/').slice(0, -1).join('/'),
                    item.name.split('/').at(-1) ?? ''
                  )
            }
          >
            <ListItemAvatar>
              <Avatar>
                {item.isDirectory ? <Folder /> : <InsertDriveFile />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.name.split('/').at(-1)}
              secondary={new Date(item.updatedAt).toLocaleString()}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  )
}
