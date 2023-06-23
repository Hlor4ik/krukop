import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Changepass from "./forgot-password";
import Changepass2 from "./reset-password";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<SignUp />}></Route>
        <Route path='/login'element={<Login />}></Route>
        <Route path='/home'element={<Home />}></Route>
        <Route path='/forgot-password'element={<Changepass />}></Route>
        <Route path='/reset-password'element={<Changepass2 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
