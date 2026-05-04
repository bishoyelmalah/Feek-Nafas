import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider.tsx'
import { OpponentContextProvider } from './contexts/OpponentContext/OpponentContextProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <OpponentContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </OpponentContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
