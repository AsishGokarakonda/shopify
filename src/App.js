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

function App() {
  const [alert, setAlert] = useState(null)
  const promptAlert =(message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <BrowserRouter>
      <Alert alert={alert}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup promptAlert={promptAlert}  />} />
          <Route path="/products" element={<Products />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
