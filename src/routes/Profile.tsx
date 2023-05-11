import React from 'react'
import { AmplifyUser } from '@aws-amplify/ui'

interface Props {
  user?: AmplifyUser
}

export function Profile(props: Props) {
  return (
    <header>
      <h1 className="text-4xl">Profile</h1>
    </header>
  )
}
