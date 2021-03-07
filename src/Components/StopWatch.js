import React from "react";
import useStopWatch from "../hooks/useStopWatch";
import { formatStopwatchTime } from "../Utilities";
import "../Timer.css";

const StopWatch = () => {
  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useStopWatch(0);

  return (
    <div style={{ marginTop:"200px" }}>
      <div className="time-card-base">
        <h3>Stopwatch</h3>
        <div  style={{ marginTop:"20px" }}>
        <div className="stopwatch-card">
          <span style={{ marginRight: "12px", marginLeft: "12px" }}>HH</span>
          <span style={{ marginRight: "12px", marginLeft: "12px" }}>MM</span>
          <span style={{ marginRight: "12px", marginLeft: "12px" }}>SS</span>
          <br />
          <div className="timefont">{formatStopwatchTime(timer)}</div>
          <div className="buttons">
            {!isActive && !isPaused ? (
              <button onClick={handleStart}>Start</button>
            ) : isPaused ? (
              <button onClick={handlePause}>Pause</button>
            ) : (
              <button onClick={handleResume}>Resume</button>
            )}
            <button onClick={handleReset} disabled={!isActive}>
              Reset
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
