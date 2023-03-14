import { Box, Grid } from '@mui/material'
import React from 'react'
import LoginForm from '../components/LoginForm'

export default function Login() {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >

        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <LoginForm />
        </Box> 
        
      </Grid> 
    </>
  )
}
