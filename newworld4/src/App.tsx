import { BrowserRouter, Routes, Route } from "react-router-dom";  // Link
import { loginRequest } from './authConfig';
import './App.css'
import { useMsal } from '@azure/msal-react';
import Dashboard from "./screens/dashboard/Dashboard";
import Home from "./screens/home/Home";
import Plain from "./screens/plain/Plain";


function App() {


    const { instance, accounts } = useMsal();

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch(e => {
            console.error(e);
        });
    };

    const handleLogout = () => {
        instance.logoutPopup();
    };

  return (
      <>

          <BrowserRouter>
              <Routes>
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/" element={<Plain />}></Route>
              </Routes>
          </BrowserRouter>

          {accounts.length > 0 ? (
              <>
                  <p>Welcome, {accounts[0].username}</p>
                  <button onClick={handleLogout}>Logout</button>
              </>
          ) : (
              <button onClick={handleLogin}>Login with Azure</button>
          )
          }
    </>
  )
}

export default App
