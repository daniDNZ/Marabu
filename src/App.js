import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/UserValidation";
import { Logout } from "./components/UserValidation.js";
import Dashboard from "./pages/Dashboard";
import LandPage from "./pages/LandPage.js";
import './css/dashboard.css';
import "./css/landPage.css";
import './css/schedule.css';
import { UserProvider } from "./context/context";
import jwt_decode from 'jwt-decode';


function App() {
  let component = <Navigate to='/Marabu/login' />

  if (localStorage.getItem('token') && jwt_decode(localStorage.getItem('token')).roles.includes('ROLE_STAFF')) {
    component = <Dashboard />
  }
  return (

    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/Marabu/" element={<LandPage />} />
          <Route path="/Marabu/login" element={<Login />} />
          <Route path="/Marabu/logout" element={<Logout />} />
          <Route path="/Marabu/turdus/*" element={component} />
        </Routes>
      </BrowserRouter>
    </UserProvider>

  )

}

export default App;