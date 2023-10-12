// import logo from './logo.svg';
import './App.css';
import{
  BrowserRouter,
  Routes,
  Route
 } from "react-router-dom";
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from "./pages/hotel/Hotel";
import Alert from './Alert';
import Login from './pages/login/Login';
import RegistrationForm from './pages/registration/RegistrationForm';
import { useState } from "react";
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <BrowserRouter>
    <Alert alert={alert}/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/hotel" element={<List/>}/>
      <Route exact path="/hotels/:id" element={<Hotel/>}/>
      <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
      <Route exact path="/registration" element={<RegistrationForm/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
