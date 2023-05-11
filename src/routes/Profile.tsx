import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { AmplifyUser } from '@aws-amplify/ui'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'

interface Props {
  user?: AmplifyUser
}

export function Profile({ user }: Props) {
  const initNickname = user?.attributes?.nickname

  const [nickname, setNickname] = useState(user?.attributes?.nickname)
  const [dirty, setDirty] = useState(false)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }

  const handleSave = () => {
    // Save changes to backend API
    setDirty(false)
  }

  useEffect(() => {
    setDirty(initNickname !== nickname)
  }, [nickname])

  return (
    <>
      <section className="mb-8">
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-nickname">닉네임</InputLabel>
          <OutlinedInput
            id="outlined-nickname"
            label="path"
            value={nickname}
            onChange={handleNameChange}
          />
        </FormControl>
      </section>
      <section>
        <Button
          type="submit"
          sx={{ width: 300, height: 50 }}
          variant="contained"
          disabled={!dirty}
          onClick={handleSave}
        >
          Save
        </Button>
      </section>
    </>
  )
}
