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
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  console.log(selectedProduct)
  return (
    <div className='contaier'>
      <Routes>
        <Route path='/signup' element = {<Signup setUser={setUser}/>}></Route>
        <Route path='/login' element = {<Login setUser={setUser}/>}></Route>

        <Route path='/' element = {<HomePage user={user} products={products} setProducts={setProducts} setSelectedProduct={setSelectedProduct}/>}></Route>
        <Route path='/cart' element = {<CartPage user={user}/>}></Route>
        <Route path='/singlePage' element = {<SingleProduct seletedProduct={selectedProduct}/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
