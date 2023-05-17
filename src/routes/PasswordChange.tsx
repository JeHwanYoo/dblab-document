import React from 'react'
import { AccountSettings } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router-dom'

export function PasswordChange() {
  const navigate = useNavigate()
  const handleSuccess = () => {
    alert('패스워드가 변경되었습니다.')
    navigate(-1)
  }

  return <AccountSettings.ChangePassword onSuccess={handleSuccess} />
}
