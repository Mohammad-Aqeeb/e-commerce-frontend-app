import './App.css';
import { Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useState } from 'react';
import SingleProduct from './components/SingleProduct';


function App() {

  const [user, setUser] = useState(undefined);
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <div className='contaier'>
      <Routes>
        <Route path='/signup' element = {<Signup setUser={setUser}/>}></Route>
        <Route path='/login' element = {<Login setUser={setUser}/>}></Route>

        <Route path='/' element = {<HomePage user={user} setSelectedProductId={setSelectedProductId}/>}></Route>
        <Route path='/cart' element = {<CartPage user={user}/>}></Route>
        <Route path='/singlePage/:productId' element = {<SingleProduct user={user} selectedProductId={selectedProductId} setSelectedProductId={setSelectedProductId}/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
