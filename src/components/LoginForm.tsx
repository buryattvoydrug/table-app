import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'

export default function LoginForm() {
  return (
    <>
    <Avatar sx={{ width: 56, height: 56 }}/>
          <Typography component="h1" variant="h5">
            Войдите, чтобы продолжить!
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Электронная почта"
              name="email"
              autoComplete="email"
              autoFocus
              // value={email}
              // onChange={onEmailChange}
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
              // value={password}
              // onChange={onPasswordChahge}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
            >
              Войти
            </Button>
          </form>
    </>
  )
}
