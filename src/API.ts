/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFileSystemInput = {
  id?: string | null,
  depth: number,
  name: string,
  isDirectory: boolean,
};

export type ModelFileSystemConditionInput = {
  depth?: ModelIntInput | null,
  name?: ModelStringInput | null,
  isDirectory?: ModelBooleanInput | null,
  and?: Array< ModelFileSystemConditionInput | null > | null,
  or?: Array< ModelFileSystemConditionInput | null > | null,
  not?: ModelFileSystemConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type FileSystem = {
  __typename: "FileSystem",
  id: string,
  depth: number,
  name: string,
  isDirectory: boolean,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFileSystemInput = {
  id: string,
  depth?: number | null,
  name?: string | null,
  isDirectory?: boolean | null,
};

export type DeleteFileSystemInput = {
  id: string,
};

export type ModelFileSystemFilterInput = {
  id?: ModelIDInput | null,
  depth?: ModelIntInput | null,
  name?: ModelStringInput | null,
  isDirectory?: ModelBooleanInput | null,
  and?: Array< ModelFileSystemFilterInput | null > | null,
  or?: Array< ModelFileSystemFilterInput | null > | null,
  not?: ModelFileSystemFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelFileSystemConnection = {
  __typename: "ModelFileSystemConnection",
  items:  Array<FileSystem | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelSubscriptionFileSystemFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  depth?: ModelSubscriptionIntInput | null,
  name?: ModelSubscriptionStringInput | null,
  isDirectory?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionFileSystemFilterInput | null > | null,
  or?: Array< ModelSubscriptionFileSystemFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateFileSystemMutationVariables = {
  input: CreateFileSystemInput,
  condition?: ModelFileSystemConditionInput | null,
};

export type CreateFileSystemMutation = {
  createFileSystem?:  {
    __typename: "FileSystem",
    id: string,
    depth: number,
    name: string,
    isDirectory: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFileSystemMutationVariables = {
  input: UpdateFileSystemInput,
  condition?: ModelFileSystemConditionInput | null,
};

export type UpdateFileSystemMutation = {
  updateFileSystem?:  {
    __typename: "FileSystem",
    id: string,
    depth: number,
    name: string,
    isDirectory: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFileSystemMutationVariables = {
  input: DeleteFileSystemInput,
  condition?: ModelFileSystemConditionInput | null,
};

export type DeleteFileSystemMutation = {
  deleteFileSystem?:  {
    __typename: "FileSystem",
    id: string,
    depth: number,
    name: string,
    isDirectory: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetFileSystemQueryVariables = {
  id: string,
};

export type GetFileSystemQuery = {
  getFileSystem?:  {
    __typename: "FileSystem",
    id: string,
    depth: number,
    name: string,
    isDirectory: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFileSystemsQueryVariables = {
  filter?: ModelFileSystemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFileSystemsQuery = {
  listFileSystems?:  {
    __typename: "ModelFileSystemConnection",
    items:  Array< {
      __typename: "FileSystem",
      id: string,
      depth: number,
      name: string,
      isDirectory: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FileSystemsByDepthAndNameQueryVariables = {
  depth: number,
  name?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFileSystemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FileSystemsByDepthAndNameQuery = {
  fileSystemsByDepthAndName?:  {
    __typename: "ModelFileSystemConnection",
    items:  Array< {
      __typename: "FileSystem",
      id: string,
      depth: number,
      name: string,
      isDirectory: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FileSystemsByNameAndIdQueryVariables = {
  name: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFileSystemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FileSystemsByNameAndIdQuery = {
  fileSystemsByNameAndId?:  {
    __typename: "ModelFileSystemConnection",
    items:  Array< {
      __typename: "FileSystem",
      id: string,
      depth: number,
      name: string,
      isDirectory: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateFileSystemSubscriptionVariables = {
  filter?: ModelSubscriptionFileSystemFilterInput | null,
};

export type OnCreateFileSystemSubscription = {
  onCreateFileSystem?:  {
    __typename: "FileSystem",
    id: string,
    depth: number,
    name: string,
    isDirectory: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFileSystemSubscriptionVariables = {
  filter?: ModelSubscriptionFileSystemFilterInput | null,
};

export type OnUpdateFileSystemSubscription = {
  onUpdateFileSystem?:  {
    __typename: "FileSystem",
    id: string,
    depth: number,
    name: string,
    isDirectory: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFileSystemSubscriptionVariables = {
  filter?: ModelSubscriptionFileSystemFilterInput | null,
};

export type OnDeleteFileSystemSubscription = {
  onDeleteFileSystem?:  {
    __typename: "FileSystem",
    id: string,
    depth: number,
    name: string,
    isDirectory: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};
