import { AppBar, Avatar, Box, Button, Container, IconButton, Toolbar } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { AuthState } from '../redux/reducers/authReducers';
import { logout } from '../redux/actions/authActions';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export default function Header() {

  const userLogin = useSelector<RootState, AuthState>(
    (state: RootState) => state.userLogin
  )
  const { loginInfo } = userLogin

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()

  const logoutHandler = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Container style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center'
            }}>
            <Link to="/">
              <IconButton edge="start" color="inherit">
                Table App
              </IconButton>
            </Link>
            
            <Box
              display="flex"
              alignItems="center"
            >
              <Link to="/login">
                <Button 
                  variant="outlined" 
                  endIcon={<LoginIcon />}
                  onClick={logoutHandler}
                >
                  {loginInfo.username
                    ? <>
                      <Box
                        display="flex"
                      >
                        <Avatar sx={{ width: 24, height: 24, marginRight: 1 }}/>
                        <span>{loginInfo.username}</span>

                      </Box>
                    </> 
                    : "Login"}
                </Button>
              </Link>

            </Box>
            
          </Container>
        </Toolbar>
      </AppBar>
  )
}
