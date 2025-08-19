import { BrowserRouter, Routes, Route } from "react-router-dom";  // Link
import { loginRequest } from './authConfig';
import './App.css'
import { useMsal } from '@azure/msal-react';
import Dashboard from "./screens/dashboard/Dashboard";
import Home from "./screens/home/Home";
import Plain from "./screens/plain/Plain";


import { POST, SafeFetch } from './helpers/fetch';
import type { SilentRequest } from "@azure/msal-browser";
import NavBar from "./elements/navBar/NavBar";

function App() {


    const { instance, accounts } = useMsal();

    const getSubdomain = (): string => {
        const x = window.location.hostname.split('.').splice(1, 1).join(".");
        return x == "" ? "dev" : x;
    };

    const handleLogin = async () => {
        try {
            await instance.loginPopup(loginRequest);

            const account = instance.getAllAccounts()[0];
            if (!account) throw new Error("No account found after login");

            // Build a request object that includes the account
            const silentRequest: SilentRequest = {
                ...loginRequest,
                account,
                forceRefresh: true,
            };

            try {
                const result = await instance.acquireTokenSilent(silentRequest);

                await SafeFetch(
                    "api/StoreToken",
                    POST({ Token: result.accessToken, Tenant: getSubdomain() })
                );

                //alert(result.accessToken);

                // loginNavigationFunction();
            } catch (silentError) {
                console.warn("Silent token failed, trying popup:", silentError);

                const popupResult = await instance.acquireTokenPopup({
                    ...loginRequest,
                    account,
                });

                await SafeFetch(
                    "api/StoreToken",
                    POST({ Token: popupResult.accessToken, Tenant: getSubdomain() })
                );

                // loginNavigationFunction();
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    const handleLogout = async () => {
        instance.logoutPopup();
        await SafeFetch("api/RemoveToken", POST({}));
    };

  return (
      <>

          <BrowserRouter>

              <NavBar title="NewWorld" accounts={accounts} handleLogin={handleLogin} handleLogout={handleLogout} ></NavBar>

              <Routes>

                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/" element={<Plain accounts={accounts} />}></Route>
              </Routes>
          </BrowserRouter>
    </>
  )
}

export default App



          //{accounts.length > 0 ? (
          //    <>
          //        <p>Welcome, {accounts[0].username}</p>
          //        <button onClick={}>Logout</button>
          //    </>
          //) : (
          //    <button onClick={}>Login with Azure</button>
          //)
          //}

