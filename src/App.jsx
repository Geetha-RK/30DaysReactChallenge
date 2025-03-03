import './App.scss'
import Day1 from './pages/Day1/Day1'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Day2 from './pages/Day2/Day2'
import Day3 from './pages/Day3/Day3'
import Day4 from './pages/Day4/Day4'
import Day5 from './pages/Day5/Day5'
import Day6 from './pages/Day6/Day6'
import Day7 from './pages/Day7/Day7'

function App() {

  return (
    <>
      
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Day1' element={<Day1/>}></Route>
          <Route path='/Day2' element={<Day2/>}></Route>
          <Route path='/Day3' element={<Day3/>}></Route>
          <Route path='/Day4' element={<Day4/>}></Route>
          <Route path='/Day5' element={<Day5/>}></Route>
          <Route path='/Day6' element={<Day6/>}></Route>
          <Route path='/Day7' element={<Day7/>}></Route>



        </Routes>
      </div>
    </>
  )
}

export default App
