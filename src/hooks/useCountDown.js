import { useState, useRef, useEffect } from 'react';

const useCountDown = (initialState = 0) => {
  const [timerTime, setTimerTime] = useState(initialState);
  const [timerOn, setTimerOn] = useState(false);
  const [timerStart, setTimerStart] = useState(0);

  const [time, setTime] = useState({seconds: "00", minutes: "00", hours: "00"});

  const intervalRef = useRef(null);

  useEffect(() => {
    setTime({
        seconds: ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2), 
        minutes: ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2), 
        hours: ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2)
    });

    if (!timerTime) {
        setTimerStart(0)
        setTimerOn(false);
        setTimerTime(0);
      return;
    }
    if (timerOn) {
      intervalRef.current = setInterval(() => {
        setTimerTime(timerTime - 1000);
      }, 1000);
      return () => {
        clearInterval(intervalRef.current);
      };
    } else {
      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [timerTime, timerStart, timerOn]);

  const startTimer = () => {
    setTimerOn(true);
    setTimerStart(timerTime);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };
  const resetTimer = () => {
    if (timerOn === false) {
      setTimerTime(0);
      //setTimerOn(true);
    }
  };

  const adjustTimer = (input) => {
    if (!timerOn) {
      if (input === "incHours" && timerTime + 3600000 < 216000000) {
        setTimerTime(timerTime + 3600000);
      } else if (input === "decHours" && timerTime - 3600000 >= 0) {
        setTimerTime(timerTime - 3600000);
      } else if (input === "incMinutes" && timerTime + 60000 < 216000000) {
        setTimerTime(timerTime + 60000);
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
        setTimerTime(timerTime - 60000);
      } else if (input === "incSeconds" && timerTime + 1000 < 216000000) {
        setTimerTime(timerTime + 1000);
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
        setTimerTime(timerTime - 1000);
      }
    }
  };

    return { timerTime, timerOn, timerStart, time, startTimer, stopTimer, resetTimer, adjustTimer }
}

export default useCountDown