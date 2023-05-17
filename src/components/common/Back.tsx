import { ArrowBackIosNew } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export function Back() {
  const navigate = useNavigate()
  return (
    <IconButton
      className="inline-block"
      aria-label="back"
      onClick={() => navigate(-1)}
    >
      <ArrowBackIosNew />
    </IconButton>
  )
}
