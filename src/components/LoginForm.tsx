import { Alert, Avatar, Box, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { login } from '../redux/actions/authActions'
import { AuthState } from '../redux/reducers/authReduces'
import { RootState } from '../redux/store'

export default function LoginForm() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()

  const userLogin = useSelector<RootState, AuthState>(
    (state: RootState) => state.userLogin
  )

  const { isLoading, error } = userLogin

  const loginSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Avatar sx={{ width: 64, height: 64, marginBottom: 1 }}/>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Typography component="h1" variant="h5">
          Войдите, чтобы продолжить!
        </Typography>
      </Box>
      
      <form noValidate onSubmit={loginSubmitHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Логин"
          name="email"
          autoComplete="email"
          autoFocus
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Box height={60}>
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Войти
          </Button>
          {error && <Alert sx={{marginTop: 1}} severity="error">
            Ошибка авторизации
          </Alert>}
          {isLoading && <Box
            display="flex"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>}
        </Box>
      </form>
      
    </>
  )
}
