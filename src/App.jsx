import './App.css';
import { Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useState } from 'react';


function App() {

  const [user, setUser] =useState(undefined);

  return (
    <div className='contaier'>

      <Routes>
        <Route path='/signup' element = {<Signup setUser={setUser}/>}></Route>
        <Route path='/login' element = {<Login setUser={setUser}/>}></Route>

        <Route path='/' element = {<HomePage user={user}/>}></Route>
        <Route path='/cart' element = {<CartPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
