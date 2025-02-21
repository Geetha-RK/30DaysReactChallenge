import './App.scss'
import Day1 from './components/Day1/Day1'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <>
      <h1 className='title'>30 Days React Challenge</h1>
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/day1' element={<Day1/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
