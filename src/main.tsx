import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider.tsx'
import { OpponentContextProvider } from './contexts/OpponentContext/OpponentContextProvider.tsx'
import { MatchContestProvider } from './contexts/MatchContext/MatchContextProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <MatchContestProvider>
        <OpponentContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </OpponentContextProvider>
      </MatchContestProvider>
    </AuthContextProvider>
  </StrictMode>,
)
