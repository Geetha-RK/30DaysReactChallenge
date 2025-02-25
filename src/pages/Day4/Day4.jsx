// import React from 'react'
import { Link } from 'react-router-dom'
import './Day4.scss'
import { useEffect, useState } from 'react';

const Day4 = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [inputTime, setInputTime] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setIstTime(getTimeForZone('Asia/Kolkata'));
      setEstTime(getTimeForZone('America/New_York'));
      setPstTime(getTimeForZone('America/Los_Angeles'));
      setUtcTime(getTimeForZone('UTC'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{},[])

  const getTimeForZone = (timezone) => {
    return new Date().toLocaleString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const [istTime, setIstTime] = useState(getTimeForZone('Asia/Kolkata'));
  const [estTime, setEstTime] = useState(getTimeForZone('America/New_York'));
  const [pstTime, setPstTime] = useState(getTimeForZone('America/Los_Angeles'));
  const [utcTime, setUtcTime] = useState(getTimeForZone('UTC'));


  const handleRestart = (e) => {
    const minutes = parseInt(inputTime, 10); // Parse the input time to integer
    if (!isNaN(minutes) && minutes > 0) {
      setTimer({ minutes: minutes, seconds: 0 }); 
      setIsTimerRunning(true);
      setInputTime("");
    } else {
      alert("Please enter a valid number of minutes");
    }
  }
  const handleStop = (e) => {
    setIsTimerRunning(false);
  }
  const handleInputChange = (e) => {
    if (e.target.value=== '' || /^\d+$/.test(e.target.value)) {
      setInputTime(e.target.value); 
    }

  }
  return (
    <div className='digi-clock'>
        <div className='todo__box1'>
                <p className='todo__title'><Link to="/">Back</Link></p>
                <div className='todo__title'>Digital Clock App</div>
        </div>
        <div className='clock'>
          <div className='clock__container'>
              <div className='clock__zone'><div className='clock__time'>{istTime}</div>IST</div>
              <div className='clock__zone'><div className='clock__time'>{estTime} </div>EST</div>
              <div className='clock__zone'><div className='clock__time'>{pstTime} </div>PST</div>
              <div className='clock__zone'><div className='clock__time'>{utcTime} </div>UTC</div>
          </div>
          <div className='clock__container1'>
            <div  className='clock__zone'>TIMER</div>
            
            <div className='clock__timer'><span className='clock__span'>{timer.minutes}</span>&nbsp;:&nbsp;<span className='clock__span'>{timer.seconds}</span></div>
            <div className='clock__settings'>
             
                  <input className='clock__input'
                    type="number" 
                    value={inputTime} 
                    onChange={handleInputChange} 
                    placeholder="Enter time in minutes" 
                    min="1" 
                  />
              <div>
                <button className="clock__button" onClick={handleRestart}>Start Timer</button>
                {isTimerRunning && <button className="clock__button" onClick={handleStop}>Stop</button>}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Day4