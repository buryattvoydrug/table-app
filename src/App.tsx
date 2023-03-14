import { Container } from '@mui/material';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Container sx={{marginTop: '80px'}}>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Container>
    </Router>
    </>
  );
}

export default App;
