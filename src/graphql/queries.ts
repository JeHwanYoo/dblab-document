/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFileSystem = /* GraphQL */ `
  query GetFileSystem($id: ID!) {
    getFileSystem(id: $id) {
      id
      depth
      name
      isDirectory
      createdAt
      updatedAt
    }
  }
`;
export const listFileSystems = /* GraphQL */ `
  query ListFileSystems(
    $filter: ModelFileSystemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFileSystems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        depth
        name
        isDirectory
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const fileSystemsByDepthAndName = /* GraphQL */ `
  query FileSystemsByDepthAndName(
    $depth: Int!
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFileSystemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    fileSystemsByDepthAndName(
      depth: $depth
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        depth
        name
        isDirectory
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const fileSystemsByNameAndId = /* GraphQL */ `
  query FileSystemsByNameAndId(
    $name: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFileSystemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    fileSystemsByNameAndId(
      name: $name
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        depth
        name
        isDirectory
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
