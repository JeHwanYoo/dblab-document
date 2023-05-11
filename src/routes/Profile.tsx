import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { AmplifyUser } from '@aws-amplify/ui'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material'

interface Props {
  user?: AmplifyUser
}

export function Profile({ user }: Props) {
  const initNickname = user?.attributes?.nickname
  const initName = user?.attributes?.name

  const [nickname, setNickname] = useState(initNickname)
  const [name, setName] = useState(initName)
  const [dirty, setDirty] = useState(false)
  const [password, setPassword] = useState('')
  const [matchedPassword, setMatchedPassword] = useState('')

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleMatchedPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMatchedPassword(event.target.value)
  }

  const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSave = () => {
    // Save changes to backend API
    setDirty(false)
  }

  useEffect(() => {
    setDirty(
      initNickname !== nickname ||
        initName !== name ||
        password !== '' ||
        matchedPassword !== ''
    )
  }, [nickname, name, password, matchedPassword])

  return (
    <>
      <section className="mb-8">
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-nickname">닉네임</InputLabel>
          <OutlinedInput
            id="outlined-nickname"
            label="path"
            value={nickname}
            onChange={handleNickNameChange}
          />
        </FormControl>
      </section>
      <section className="mb-8">
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-name">이름</InputLabel>
          <OutlinedInput
            id="outlined-name"
            label="path"
            value={name}
            onChange={handleNameChange}
          />
        </FormControl>
      </section>
      <section className="mb-8">
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-password"
            label="path"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
      </section>
      <section className="mb-8">
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-matched-password">
            Matched Password
          </InputLabel>
          <OutlinedInput
            id="outlined-matched-password"
            label="path"
            type="password"
            value={matchedPassword}
            onChange={handleMatchedPasswordChange}
            disabled={!password}
            error={password !== matchedPassword}
          />
          <FormHelperText>
            {password !== matchedPassword && '패스워드가 일치하지 않습니다.'}
          </FormHelperText>
        </FormControl>
      </section>
      <section>
        <Button
          type="submit"
          sx={{ width: 300, height: 50 }}
          variant="contained"
          disabled={!dirty || password !== matchedPassword}
          onClick={handleSave}
        >
          Save
        </Button>
      </section>
    </>
  )
}
