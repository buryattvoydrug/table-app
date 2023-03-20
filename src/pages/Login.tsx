import { Box, Grid } from '@mui/material'
import LoginForm from '../components/LoginForm'

export default function Login() {
  return (
    <>
    <Box
        display="flex"
        justifyContent="center"
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '70vh' }}
        >
          <LoginForm />
        </Grid> 
    </Box>
    </>
  )
}
