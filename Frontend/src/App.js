import React from 'react';
import {useState} from 'react';
import Home from './components/Pages/Home';
import Aboutus from './components/Pages/Aboutus';
import Contactus from './components/Pages/Contactus';
import Products from './components/Pages/Products';
import SingleProductPage from './components/Pages/SingleProductPage/SingleProductPage';
import './App.css';
import Login from './components/Login/Login';
import {Routes,Route,useMatch } from 'react-router-dom';
import Register from './components/Register/Register';
import Dashboard from './components/AdminPanel/Contents/Dashboard';
import ProductsAdmin from './components/AdminPanel/Contents/Products';
import Homeadmin from './components/AdminPanel/Home';	
import EditProduct from './components/AdminPanel/Contents/EditProduct';
import Order from './components/Order/Order';
import ProfileUpdate from './components/profile/Profile';


function App() { 
  const [products,setProducts]=useState([])



  const match=useMatch('/products/:id')
  const product=match
                ?products.find(p=>p._id===match.params.id)
                :null

  
  return (  
    <div className="container">           
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<Aboutus/>} exact/>
          <Route path="/contact" element={<Contactus/>} exact/>
          <Route path="products" element={<Products products={products} setProducts={setProducts} />} exact/>
          <Route path="/login" element={<Login/>} exact/>
          <Route path="/register" element={<Register/>} exact/>
          <Route path="/products/:id" element={<SingleProductPage product={product}/>} exact/> 
          <Route path="*" element={<h1>404 Not Found</h1>}/>
          <Route path="/admin" element={<Homeadmin/>}/> 
          <Route path="/profile" element={<ProfileUpdate/>}/> 
          <Route path="/order" element={<Order/>}/> 


          <Route path="/editProduct" element={<EditProduct/>} exact/>
        </Routes>
        
        
    </div>
  );
}

export default App;
