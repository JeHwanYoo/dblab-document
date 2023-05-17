import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { AmplifyUser } from '@aws-amplify/ui'
import {
  Avatar,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { generateColorSet } from 'random-color-set'
import { Refresh } from '@mui/icons-material'
import Box from '@mui/material/Box'
import { Amplify } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'

interface Props {
  user?: AmplifyUser
}

export function Profile({ user }: Props) {
  const initNickname = user?.attributes?.nickname
  const initName = user?.attributes?.name
  const initPreferredColor = user?.attributes
    ? user?.attributes['custom:preferredColor']
    : '#ffffff'
  const { textColor: initTextColor } = generateColorSet(initPreferredColor)

  const [nickname, setNickname] = useState(initNickname)
  const [name, setName] = useState(initName)
  const [dirty, setDirty] = useState(false)
  const [preferredColor, setPreferredColor] = useState(initPreferredColor)
  const [textColor, setTextColor] = useState(initTextColor)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()

  const handleNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)

    if (!event.target.value) {
      errors['nickname'] = '필수 입력입니다.'
      setErrors(errors)
    } else {
      delete errors['nickname']
      setErrors(errors)
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)

    if (!event.target.value) {
      errors['name'] = '필수 입력입니다.'
      setErrors(errors)
    } else {
      delete errors['name']
      setErrors(errors)
    }
  }

  const handlePreferredColorChange = (newValue: string) => {
    setPreferredColor(newValue)
  }

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    setErrors({})

    if (!name?.trim()) {
      errors.name = '필수 입력입니다.'
    }
    if (!nickname?.trim()) {
      errors.nickname = '필수 입력입니다.'
    }

    setErrors(errors)

    if (Object.keys(errors).length > 0) {
      return false
    }

    try {
      await Amplify.Auth.updateUserAttributes(user, {
        nickname: nickname,
        name: name,
        'custom:preferredColor': preferredColor,
      })
    } catch (e) {
      console.error(e)
      alert('업데이트에 실패했습니다.')
      return false
    }

    // Save changes to backend API
    setDirty(false)
  }

  useEffect(() => {
    setDirty(
      initNickname !== nickname ||
        initName !== name ||
        initPreferredColor !== preferredColor
    )
  }, [nickname, name, preferredColor])

  useEffect(() => {
    const { textColor } = generateColorSet(preferredColor)
    setTextColor(textColor)
  }, [preferredColor])

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <section className="mb-8 flex gap-x-4 items-center">
        <MuiColorInput
          format="hex"
          fallbackValue="#ffffff"
          isAlphaHidden
          value={preferredColor}
          onChange={handlePreferredColorChange}
        />
        <Avatar
          sx={{
            bgcolor: preferredColor,
            width: 48,
            height: 48,
          }}
          alt={nickname ?? 'G'}
        >
          <span
            style={{
              color: textColor,
              fontSize: 24,
            }}
          >
            {nickname?.charAt(0).toUpperCase() ?? 'G'}
          </span>
        </Avatar>
        <Button
          type="button"
          onClick={() => setPreferredColor(initPreferredColor)}
        >
          <Refresh />
        </Button>
      </section>
      <section className="mb-8">
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-nickname">닉네임</InputLabel>
          <OutlinedInput
            required
            error={!!errors['nickname']}
            id="outlined-nickname"
            label="path"
            value={nickname}
            onChange={handleNickNameChange}
          />
          {!!errors['nickname'] && (
            <FormHelperText> {errors['nickname']} </FormHelperText>
          )}
        </FormControl>
      </section>
      <section className="mb-8">
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-name">이름</InputLabel>
          <OutlinedInput
            required
            error={!!errors['name']}
            id="outlined-name"
            label="path"
            value={name}
            onChange={handleNameChange}
          />
          {!!errors['name'] && (
            <FormHelperText> {errors['name']} </FormHelperText>
          )}
        </FormControl>
      </section>
      <section className="mb-8">
        <Button
          type="button"
          sx={{ width: 300, height: 50 }}
          variant="contained"
          onClick={() => navigate('/password-change')}
        >
          패스워드 변경
        </Button>
      </section>
      <section>
        <Button
          type="submit"
          sx={{ width: 300, height: 50 }}
          variant="contained"
          disabled={!dirty}
        >
          변경사항 저장
        </Button>
      </section>
    </Box>
  )
}
