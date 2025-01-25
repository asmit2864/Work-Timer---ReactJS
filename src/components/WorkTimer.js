import React, { useState, useEffect } from "react";

export default function WorkTimer() {
  const [workTime, setWorkTime] = useState(25 * 60); 
  const [breakTime, setBreakTime] = useState(5 * 60); 
  const [tempWorkTime, setTempWorkTime] = useState(25); 
  const [tempBreakTime, setTempBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);

  
  useEffect(() => {
    let timer;

    if(isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } 
    else if(isRunning && timeLeft === 0) {
      if (isWorkPhase) {
        alert("Work has completed")
        setTimeLeft(breakTime);
        setIsWorkPhase(false);
      } 
      else { 
        alert("Break has completed")
        handleReset()
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkPhase, workTime, breakTime]);

  const handleSet = () => {
    setWorkTime(tempWorkTime * 60); 
    setBreakTime(tempBreakTime * 60); 
    setTimeLeft(tempWorkTime * 60);
    setIsRunning(false); 
    setIsWorkPhase(true); 
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWorkPhase(true)
    setTimeLeft( workTime);
  };

  return (
    <div>
      <h1>{isWorkPhase ? "Work - Time" : "Break - Time"}</h1>
      <h2>{Math.floor(timeLeft/60)}:{timeLeft%60}</h2>
      
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button><br/>
      
      <input type="number" placeholder="Enter work duration" value={tempWorkTime} onChange={(e)=>setTempWorkTime(e.target.value)}/>
      <input type="number" placeholder="Enter break duration" value={tempBreakTime} onChange={(e)=>setTempBreakTime(e.target.value)}/>
      
      <button onClick={handleSet}>Set</button>
      
    </div>
  );
}
