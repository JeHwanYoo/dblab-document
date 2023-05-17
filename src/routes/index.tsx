import React from 'react'
import { Editor, Props as EditorProps } from './Editor'
import { Profile } from './Profile'
import { Finder } from './Finder'
import { EditNote, Search } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { generateColorSet, generateRandomColorSet } from 'random-color-set'
import type { AmplifyUser } from '@aws-amplify/ui'
import { PasswordChange } from './PasswordChange'

interface AvatarProps {
  preferredColor?: string | null
  nickname?: string | null
}

interface UserProps {
  user?: AmplifyUser
}

export const routes = [
  {
    name: 'Finder',
    path: '/',
    element: () => <Finder />,
    icon: () => <Search />,
  },
  {
    name: 'Editor',
    path: '/editor',
    element: (props?: EditorProps) => <Editor user={props?.user} />,
    icon: () => <EditNote />,
  },
  {
    name: 'Profile',
    path: '/profile',
    element: (props?: UserProps) => <Profile user={props?.user} />,
    icon: (props?: AvatarProps) => {
      const { backgroundColor, textColor } = props?.preferredColor
        ? generateColorSet(props.preferredColor)
        : generateRandomColorSet()

      return (
        <Avatar
          sx={{
            bgcolor: backgroundColor,
            width: 24,
            height: 24,
          }}
          alt={props?.nickname ?? 'G'}
        >
          <span
            style={{
              color: textColor,
              fontSize: 12,
            }}
          >
            {props?.nickname?.charAt(0).toUpperCase() ?? 'G'}
          </span>
        </Avatar>
      )
    },
  },
  {
    name: 'PasswordChange',
    path: '/password-change',
    element: () => <PasswordChange />,
    icon: () => <></>,
    hidden: true,
  },
]
