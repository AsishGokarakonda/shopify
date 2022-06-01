import './App.css';
import Signup from './components/Signup';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import { useState } from 'react';
import Products from './components/Products';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ProductsState from './context/productsState'
import ProductReviews from './components/ProductReviews';
import AdminHome from './components/AdminHome';
import AdminViewListOfUsers from './components/AdminViewListOfUsers';
import AdminAddProduct from './components/AdminAddProduct';
import AdminUpdateProducts from './components/AdminUpdateProducts'

function App() {
  const [alert, setAlert] = useState(null)
  const promptAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <ProductsState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup promptAlert={promptAlert} />} />
            <Route path="/login" element={<Login promptAlert={promptAlert} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productReviews" element={<ProductReviews />} />
            <Route path="/Adminhome" element={<AdminHome />} />
            <Route path="/listofusers" element={<AdminViewListOfUsers />} />
            <Route path="/addproduct" element={<AdminAddProduct promptAlert={promptAlert} />} />
            <Route path="/updateproduct" element={<AdminUpdateProducts promptAlert={promptAlert} />} />
            

          </Routes>
        </BrowserRouter>
      </ProductsState>
    </>
  );
}

export default App;
