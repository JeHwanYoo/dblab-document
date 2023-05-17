// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FileSystem } = initSchema(schema);

export {
  FileSystem
};