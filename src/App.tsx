import { Routes, Route } from 'react-router' 
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { FindMatchPage } from './pages/FindMatchPage/FindMatchPage'
import { MatchPage } from './pages/MatchPage/MatchPage'
import { VictoryPage } from './pages/VictoryPage/VictoryPage'
import { LosePage } from './pages/LosePage/LosePage'

function App() {
  return (
    <Routes>
      <Route path='/home' element={<HomePage />}></Route>
      <Route path='/findMatch' element={<FindMatchPage />}></Route>
      <Route path='/match' element={<MatchPage />}></Route>
      <Route path='/victory' element={<VictoryPage />}></Route>
      <Route path='/lose' element={<LosePage />}></Route>
    </Routes>
  )
}

export default App
