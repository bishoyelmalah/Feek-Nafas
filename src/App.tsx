import { Routes, Route } from 'react-router'
import './App.css'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { HomePage } from './pages/HomePage/HomePage'
import { FindMatchPage } from './pages/FindMatchPage/FindMatchPage'
import { MatchPage } from './pages/MatchPage/MatchPage'
import { VictoryPage } from './pages/VictoryPage/VictoryPage'
import { LosePage } from './pages/LosePage/LosePage'
import { LoginPage } from './pages/loginPage/loginPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
import { GetReadyPage } from './pages/GetReadyPage/GetReadyPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { SettingsPage } from './pages/SettingsPage/SettingsPage'

function App() {
  return (
    <Routes>
      <Route index element={<PublicRoute><LandingPage /></PublicRoute>}></Route>
      <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path='/findMatch' element={<ProtectedRoute><FindMatchPage /></ProtectedRoute>}></Route>
      <Route path='/getReady/:id' element={<ProtectedRoute><GetReadyPage /></ProtectedRoute>}></Route>
      <Route path='/match/:id' element={<ProtectedRoute><MatchPage /></ProtectedRoute>}></Route>
      <Route path='/victory' element={<ProtectedRoute><VictoryPage /></ProtectedRoute>}></Route>
      <Route path='/lose' element={<ProtectedRoute><LosePage /></ProtectedRoute>}></Route>
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/presentation" element={
        <PublicRoute>
          <iframe src="/Presentation/Presentation.html" style={{ width: '100vw', height: '100vh', border: 'none' }} title="Presentation" />
        </PublicRoute>
      } />
    </Routes>
  )
}

export default App
