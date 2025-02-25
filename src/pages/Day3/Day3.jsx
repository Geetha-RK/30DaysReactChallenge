import { Link } from 'react-router-dom'
import './Day3.scss'
import { useState } from 'react'
// Import React Toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Day3 = () => {
  const [weight,setWeight] = useState("");
  const [height,setHeight] = useState("");
  const [age,setAge] = useState("");
  const [gender,setGender] = useState("");
  const [ weightunit, setWeightUnit] = useState('lb');
  const [ heightunit, setHeightUnit] = useState('cm');
  const[bmi,setBmi] = useState("");

  const bmtTable = [{
    classification: 'Underweight',
    category:'<18.5'
  },
  {
    classification: 'Normal Weight',
    category:'18.5 - 24.9'
  },
  {
    classification: 'Overweight',
    category:'25.0 - 29.9'
  },
  {
    classification: 'Obese class I',
    category:'30.0 - 34.9',
  },
  {
    classification: 'Obese class II',
    category:'35.0 - 39.9',
  },
  {
    classification: 'Obese class III',
    category:'>= 40.0',
  },
]

  const handleWeight = (e) => {
    setWeight(e.target.value);
  }
  const handleHeight = (e) => {
    setHeight(e.target.value);
  }
  const handleAge = (e) => {
    setAge(e.target.value);
  }
  const handleGender = (e) => {
    setGender(e.target.value);
  }
  const handleWeightUnit= (e) => {
    setWeightUnit(e.target.value);
  }
  const handleHeightUnit = (e) => {
    setHeightUnit(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!weight || !height || !age || !gender) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    if (age < 2 || age > 120) {
      toast.error("Please enter a valid age (2 to 120).");
      return;
    }

    if(weight && height && age && gender){
      const bmi = calculateBMI(weight, height, weightunit, heightunit);
      toast.success(`Your BMI is: ${bmi}`);
      console.log("Calculated BMI:", bmi);
      setBmi(bmi)
    }else{
      toast.error("Please fill in all required fields.");
    }
    console.log("Weight:", weight, "Height:", height, "Age:", age, "Gender:", gender);
    setHeight("");
    setWeight("");
    setAge("");
    setGender("")
  }
  const calculateBMI = (weight,height,weightunit,heightunit) => {
    if(weight && height) {
        let weightInKg = weight;
        let heightInM = height / 100; 
    
        // If weight is in pounds, convert it to kilograms.
        if (weightunit === "lb") {
          weightInKg = weight * 0.453592;
        }
    
        // If height is in inches, convert it to meters.
        if (heightunit === "inches") {
          heightInM = height * 0.0254; // 1 inch = 0.0254 meters
        }
    
        // Calculate BMI: BMI = weight(kg) / height(m)^2
        const bmiValue = weightInKg / (heightInM * heightInM);
        return bmiValue.toFixed(2); // Return BMI rounded to 2 decimal places.
    }else{
      return null
    }
  }
  return (
    <>
    <div className='bmi'>
      
        <div className='todo__box1'>
                <p className='todo__title'><Link to="/">Back</Link></p>
                <div className='todo__title'>BMI Calculator App</div>
        </div>
        <div className='bmi__container2'>
        <div className='bmi__container'>
          <form className='bmi__form' action="submit" onSubmit={handleSubmit}>
              <label htmlFor="age"><strong>Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> <input className="bmi__input" type="number" name="age" id="age" value={age} onChange={handleAge} placeholder='Enter your Age'/></label>
              <label htmlFor="weight"><strong>Weight&nbsp;&nbsp;</strong> <input className="bmi__input" type="number" id="weight" value={weight} onChange={handleWeight} placeholder='Enter your weight' required/>&nbsp;<span><select  className="bmi__select" name="weightunit" id="wunit" value={weightunit} onChange={handleWeightUnit}><option value="lb">lb</option><option value="kg">kg</option></select></span></label>
              <label htmlFor="height"><strong>Height&nbsp;&nbsp;&nbsp;</strong> <input className="bmi__input" type="number" id="height" value={height} onChange={handleHeight} placeholder='Enter your height' required/>&nbsp;<span><select  className="bmi__select"  name="heightunit" id="hunit" value={heightunit} onChange={handleHeightUnit}><option value="cm">cm</option><option value="inches">inches</option></select></span></label>
              
                <label htmlFor=""><strong>Gender&nbsp;&nbsp;</strong> </label> 
                <div className='bmi__gender'>
                <label htmlFor="male">Male <input type="radio" name="gender" id="male" value="male" checked={gender === "male"} onChange={handleGender}/></label>
                <label htmlFor="female">Female <input type="radio" name="gender" id="female" value="female" checked={gender === "female"} onChange={handleGender}/></label>
                </div>
              <button className="bmi__button" type="submit" >Calculate BMI</button>
          </form>
        </div>
        <ToastContainer position="bottom-right" />
        <div className='bmi__container1'>
          <table>
            <thead className='bmi__thead'>
              <tr className='bmi__trow'> 
                <th className='bmi__thead'>Classification</th>
                <th className='bmi__thead'>BMI Category</th>
              </tr>          
            </thead>
            <tbody>
                {bmtTable.map((item,index) => {
                  return (
                    <tr className='bmi__trow' key={index}>
                        <td className='bmi__td' >{item.classification}</td>
                        <td className='bmi__td' >{item.category}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
       </div>
       </div>
       <div className='bmi__result'>Your BMI value is <strong>{bmi}</strong></div>
    </div>
    
    </>
  )
}

export default Day3