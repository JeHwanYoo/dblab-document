import gql from 'graphql-tag'

const clientSchemaExtensions = gql`
  directive @model on OBJECT
  scalar AWSDateTime
`
