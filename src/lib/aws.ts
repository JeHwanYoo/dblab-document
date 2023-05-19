import { API, Storage } from 'aws-amplify'
import * as queries from '../graphql/queries'
import * as mutations from '../graphql/mutations'
import { GraphQLQuery } from '@aws-amplify/api'
import {
  FileSystem,
  FileSystemsByDepthAndNameQuery,
  FileSystemsByNameAndIdQuery,
} from '../API'

export async function createFile(
  path: string,
  object: string | Blob,
  level: 'public' | 'private' | 'protected' = 'public'
) {
  const pathSplit = path.split('/')
  let lastName = ''

  for (const [index, name] of Object.entries(pathSplit)) {
    const newPath = [lastName, name].join('/')

    const result = await API.graphql<GraphQLQuery<FileSystemsByNameAndIdQuery>>(
      {
        query: queries.fileSystemsByNameAndId,
        variables: {
          name: newPath,
          limit: 1,
        },
      }
    )

    const item = result.data?.fileSystemsByNameAndId?.items[0]

    if (!item) {
      await Storage.put(path, object, {
        level,
      })

      await API.graphql({
        query: mutations.createFileSystem,
        variables: {
          input: {
            name: newPath,
            depth: Number(index),
            isDirectory: Number(index) !== pathSplit.length - 1,
          },
        },
      })
      console.log('created', newPath)
    } else {
      console.log('already exists', newPath)
    }

    lastName = newPath

    console.log(lastName, result)
  }

  console.log('done')
}

export async function lsWithDepth(
  depth: number,
  name: string,
  limit?: number,
  nextToken?: string
): Promise<FileSystem[] | undefined> {
  const result = await API.graphql<
    GraphQLQuery<FileSystemsByDepthAndNameQuery>
  >({
    query: queries.fileSystemsByDepthAndName,
    variables: {
      depth,
      name: {
        beginsWith: name,
      },
      limit: limit ?? 100,
      nextToken: nextToken ?? undefined,
    },
  })

  return result.data?.fileSystemsByDepthAndName?.items as
    | FileSystem[]
    | undefined
}

export async function readFile(path: string) {
  const key = path.startsWith('/') ? path.slice(1) : path

  const { Body } = await Storage.get(key, { download: true })

  switch (true) {
    case Body instanceof Blob:
      return (Body as Blob).text()
    default:
      return null
  }
}
