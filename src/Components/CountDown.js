import useCountDown from "../hooks/useCountDown";
import { formatCountDownTime } from "../Utilities";
import "../Timer.css";

const CountDown = () => {
  const {
    timerTime,
    timerOn,
    timerStart,
    time,
    startTimer,
    stopTimer,
    resetTimer,
    adjustTimer,
  } = useCountDown(0);

  return (
    <div style={{ marginTop: "200px" }}>
      <div className="time-card-base">
        <h3>Countdown</h3>
        <div  style={{ marginTop:"20px" }}>
        <div className="stopwatch-card">
          <span style={{ marginRight: "12px", marginLeft: "12px" }}>HH</span>
          <span style={{ marginRight: "12px", marginLeft: "12px" }}>MM</span>
          <span style={{ marginRight: "12px", marginLeft: "12px" }}>SS</span>
          <br />
          <button
            style={{ marginRight: "8px", marginLeft: "8px" }}
            onClick={() => adjustTimer("incHours")}
          >
            &#8679;
          </button>
          <button
            style={{ marginRight: "8px", marginLeft: "8px" }}
            onClick={() => adjustTimer("incMinutes")}
          >
            &#8679;
          </button>
          <button
            style={{ marginRight: "8px", marginLeft: "8px" }}
            onClick={() => adjustTimer("incSeconds")}
          >
            &#8679;
          </button>

          <div className="timefont">{formatCountDownTime(time)}</div>

          <button
            style={{ marginRight: "8px", marginLeft: "8px" }}
            onClick={() => adjustTimer("decHours")}
          >
            &#8681;
          </button>
          <button
            style={{ marginRight: "8px", marginLeft: "8px" }}
            onClick={() => adjustTimer("decMinutes")}
          >
            &#8681;
          </button>
          <button
            style={{ marginRight: "8px", marginLeft: "8px" }}
            onClick={() => adjustTimer("decSeconds")}
          >
            &#8681;
          </button>

          <div className="buttons">
            {timerOn === false &&
              (timerStart === 0 || timerTime === timerStart) && (
                <button className="Button-start" onClick={startTimer}>
                  Start
                </button>
              )}
            {timerOn === true && timerTime >= 1000 && (
              <button className="Button-stop" onClick={stopTimer}>
                Stop
              </button>
            )}
            {timerOn === false &&
              timerStart !== 0 &&
              timerStart !== timerTime &&
              timerTime !== 0 && (
                <button className="Button-start" onClick={startTimer}>
                  Resume
                </button>
              )}

            {(timerOn === false || timerTime < 1000) &&
              timerStart !== timerTime &&
              timerStart > 0 && (
                <button className="Button-reset" onClick={resetTimer}>
                  Reset
                </button>
              )}
          </div>
        </div>
        </div> 
      </div>
    </div>
  );
};
export default CountDown;
