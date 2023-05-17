import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerFileSystem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FileSystem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly depth: number;
  readonly name: string;
  readonly isDirectory: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFileSystem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FileSystem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly depth: number;
  readonly name: string;
  readonly isDirectory: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FileSystem = LazyLoading extends LazyLoadingDisabled ? EagerFileSystem : LazyFileSystem

export declare const FileSystem: (new (init: ModelInit<FileSystem>) => FileSystem) & {
  copyOf(source: FileSystem, mutator: (draft: MutableModel<FileSystem>) => MutableModel<FileSystem> | void): FileSystem;
}