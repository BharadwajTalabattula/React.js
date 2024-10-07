import { useState, useEffect } from "react";
import "./stylesClock.css"

export default function PomodoroClock(){
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, seTtimeLeft] = useState(1500);
  const [timingType, setTimingtype] = useState("SESSION");
  const [play, setPlay] = useState(false);
  
  // Handle play/pause toggle
  const handlePlay = () => {
    setPlay(!play);
  }

  // Handle reset button
  const handleReset = () => {
    setPlay(false);
    seTtimeLeft(1500);  // Reset to default 25 minutes
    setBreakLength(5);   // Reset break to 5 minutes
    setSessionLength(25); // Reset session to 25 minutes
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  // Increment break length
  const handleBreakIncrease = () => {
    if(breakLength < 60) setBreakLength(breakLength + 1);
  }

  // Decrement break length
  const handleBreakDecrease = () => {
    if(breakLength > 1) setBreakLength(breakLength - 1);
  }

  // Increment session length
  const handleSessionIncrease = () => {
    if(sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      seTtimeLeft((sessionLength + 1) * 60);  // Update the timeLeft to new session length
    }
  }

  // Decrement session length
  const handleSessionDecrease = () => {
    if(sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      seTtimeLeft((sessionLength - 1) * 60);  // Update the timeLeft to new session length
    }
  }

  // Reset timer when session or break finishes
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if (!timeLeft && timingType === "SESSION") {
      seTtimeLeft(breakLength * 60);  // Switch to break
      setTimingtype("BREAK");
      audio.play();
    } else if (!timeLeft && timingType === "BREAK") {
      seTtimeLeft(sessionLength * 60);  // Switch to session
      setTimingtype("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  }

  // Effect to handle countdown
  useEffect(() => {
    if (play && timeLeft > 0) {
      const timeoutId = setTimeout(() => {
        seTtimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else if (timeLeft === 0) {
      resetTimer();
    }
  }, [play, timeLeft, timingType, breakLength, sessionLength]);

  // Format the time display
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const title = timingType === "SESSION" ? "Session" : "Break";

  return (
   <div>
    <div className="wrapper">
      <h2>25 + 5 Clock</h2>
      <div className="break-session-length">
        <div>
          <h3 id="break-label">Break Length</h3>
          <div>
            <button disabled={play} onClick={handleBreakIncrease} id="break-increment">Increase</button>
            <strong id="break-length">{breakLength}</strong>
            <button disabled={play} onClick={handleBreakDecrease} id="break-decrement">Decrease</button>
          </div>
        </div>
        <div>
          <h3 id="session-label">Session Length</h3>
          <div>
            <button disabled={play} onClick={handleSessionIncrease} id="session-increment">Increase</button>
            <strong id="session-length">{sessionLength}</strong>
            <button disabled={play} onClick={handleSessionDecrease} id="session-decrement">Decrease</button>
          </div>
        </div>
      </div>
      <div className="timer-wrapper">
        <div className="timer">
          <h2 id="timer-label">{title}</h2>
          <h3 id="time-left">{timeFormatter()}</h3>
        </div>
        <button onClick={handlePlay} id="start_stop">Start/Stop</button>
        <button onClick={handleReset} id="reset">Reset</button>
      </div>
    </div>
    <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>
  );
}
