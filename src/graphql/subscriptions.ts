/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFileSystem = /* GraphQL */ `
  subscription OnCreateFileSystem(
    $filter: ModelSubscriptionFileSystemFilterInput
  ) {
    onCreateFileSystem(filter: $filter) {
      id
      depth
      name
      isDirectory
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFileSystem = /* GraphQL */ `
  subscription OnUpdateFileSystem(
    $filter: ModelSubscriptionFileSystemFilterInput
  ) {
    onUpdateFileSystem(filter: $filter) {
      id
      depth
      name
      isDirectory
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFileSystem = /* GraphQL */ `
  subscription OnDeleteFileSystem(
    $filter: ModelSubscriptionFileSystemFilterInput
  ) {
    onDeleteFileSystem(filter: $filter) {
      id
      depth
      name
      isDirectory
      createdAt
      updatedAt
    }
  }
`;
