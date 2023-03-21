import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Login from './pages/Login';
import Main from './pages/Main';
import { AuthState } from './redux/reducers/authReducers';
import { RootState } from './redux/store';

function App() {

  const userLogin = useSelector<RootState, AuthState>(
    (state: RootState) => state.userLogin
  )
  const { loginInfo } = userLogin
  
  return (
    <>
    <Router>
      <Header />
      <Container sx={{marginTop: '80px'}} maxWidth="xl">
        <Routes>
          <Route path='/table-app/' element={loginInfo.authToken
                                   ? <Main/>
                                   : <Navigate to="/table-app/login"/>
                                   }/>
          <Route path='/table-app/login' element={loginInfo.authToken
                                   ? <Navigate to="/table-app/"/>
                                   : <Login/>
                                   }/>
        </Routes>
      </Container>
    </Router>
    </>
  );
}

export default App;
