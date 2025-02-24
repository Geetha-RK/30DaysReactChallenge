import { Link } from 'react-router-dom'
import './Day3.scss'
import { useState } from 'react'

const Day3 = () => {
  const [weight,setWeight] = useState("");
  const [height,setHeight] = useState("");
  const [gender,setGender] = useState(true);
  const handleWeight = (e) => {
    setWeight(e.target.value);
  }
  const handleHeight = (e) => {
    setHeight(e.target.value);
  }
  const handleSubmit = () => {
    setHeight("");
    setWeight("");
  }
  return (
    <div className='bmi'>
        <div className='todo__box1'>
                <p className='todo__title'><Link to="/">Back</Link></p>
                <div className='todo__title'>BMI Calculator App</div>
        </div>
        <div className='bmi__container'>
          <form className='bmi__form' action="submit">
            <label htmlFor="weight">Weight <input type="number" id="weight" value={weight} onChange={handleWeight} placeholder='Enter your weight'/></label>
            <label htmlFor="height">Height  <input type="number" id="height" value={height} onChange={handleHeight} placeholder='Enter your height' /></label>
            <label htmlFor="male">Male <input type="radio" name="Male" id="male" /></label>
            <label htmlFor="female">Female <input type="radio" name="Female" id="female" /></label>
            <button type="submit" onClick={handleSubmit}>Calculate BMI</button>
            </form>
        </div>
    </div>
  )
}

export default Day3