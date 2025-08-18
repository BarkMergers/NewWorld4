import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import React from 'react';

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MsalProvider instance={msalInstance}>
            <App />
        </MsalProvider>
    </StrictMode>,
)
