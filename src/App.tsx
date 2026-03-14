import { Routes, Route } from 'react-router'
import './App.css'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { HomePage } from './pages/HomePage/HomePage'
import { FindMatchPage } from './pages/FindMatchPage/FindMatchPage'
import { MatchPage } from './pages/MatchPage/MatchPage'
import { VictoryPage } from './pages/VictoryPage/VictoryPage'
import { LosePage } from './pages/LosePage/LosePage'
import { LoginPage } from './pages/loginPage/loginPage'
import {RegisterPage} from './pages/RegisterPage/RegisterPage'
import { GetReadyPage } from './pages/GetReadyPage/GetReadyPage'

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />}></Route>
      <Route path='/home' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/findMatch' element={<FindMatchPage />}></Route>
      <Route path='/getReady' element={<GetReadyPage />}></Route>
      <Route path='/match' element={<MatchPage />}></Route>
      <Route path='/victory' element={<VictoryPage />}></Route>
      <Route path='/lose' element={<LosePage />}></Route>
    </Routes>
  )
}

export default App
