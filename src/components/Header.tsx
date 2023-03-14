import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Container style={{display: 'flex', justifyContent: 'space-between'}}>
            <Link to="/">
              <IconButton edge="start" color="inherit">
                Table Application
              </IconButton>
            </Link>
            <Link to="/login">
              <Button 
                variant="outlined" 
                endIcon={<LoginIcon />}
              >
                Login 
              </Button>
            </Link> 
          </Container>
        </Toolbar>
      </AppBar>
  )
}
