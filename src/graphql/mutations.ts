/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFileSystem = /* GraphQL */ `
  mutation CreateFileSystem(
    $input: CreateFileSystemInput!
    $condition: ModelFileSystemConditionInput
  ) {
    createFileSystem(input: $input, condition: $condition) {
      id
      depth
      name
      isDirectory
      createdAt
      updatedAt
    }
  }
`;
export const updateFileSystem = /* GraphQL */ `
  mutation UpdateFileSystem(
    $input: UpdateFileSystemInput!
    $condition: ModelFileSystemConditionInput
  ) {
    updateFileSystem(input: $input, condition: $condition) {
      id
      depth
      name
      isDirectory
      createdAt
      updatedAt
    }
  }
`;
export const deleteFileSystem = /* GraphQL */ `
  mutation DeleteFileSystem(
    $input: DeleteFileSystemInput!
    $condition: ModelFileSystemConditionInput
  ) {
    deleteFileSystem(input: $input, condition: $condition) {
      id
      depth
      name
      isDirectory
      createdAt
      updatedAt
    }
  }
`;
