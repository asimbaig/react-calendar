import axios from "./axios-calendar";

export const TotalHours = Array.from(Array(24).keys());
export const multiply = (num1, num2) => {
  return num1 * num2;
};
export const DateoutTime = (dateTime) => {
  var date = new Date(dateTime.getTime());
  date.setHours(0, 0, 0, 0);
  return date;
};
export const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};

export const lastDayOfMonth = function (y, m) {
  return new Date(y, m, 0).getDate();
};
export const datesTaskToBeAdded = (task) => {
  var date = new Date(task.year + "/" + task.month + "/" + task.day);
  var datesToReturn = [];
  //For Rest of day of week
  if (task.repeat === "1") {
    datesToReturn.push({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });

    Array.from(Array(7 - date.getDay()).keys()).map((index) => {
      date.setDate(date.getDate() + 1);
      datesToReturn.push({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      return null;
    });
    return datesToReturn;
  }
  //For Rest of day of Month
  else if (task.repeat === "2") {
    var daysToAdd = lastDayOfMonth(task.year, task.month) - task.day;

    datesToReturn.push({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });

    Array.from(Array(daysToAdd).keys()).map((index) => {
      date.setDate(date.getDate() + 1);
      datesToReturn.push({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      return null;
    });
    return datesToReturn;
  }
  //Same day of week for rest of month
  else if (task.repeat === "3") {
    while (date.getMonth() + 1 <= task.month) {
      datesToReturn.push({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
      date.setDate(date.getDate() + 7);
    }
    return datesToReturn;
  }
  //Same date of month for rest of year
  // else if (task.repeat === "4") {
  //   while (date.getFullYear() <= task.year) {
  //     datesToReturn.push({day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()});
  //     if (date.getDate() === 31) {
  //       date.setMonth(date.getMonth() + 1);
  //       if (date.getDate() === 1) {
  //         date.setDate(date.getDate() - 1);
  //       }
  //     } else {
  //       date.setMonth(date.getMonth() + 1);
  //       if (
  //         lastDayOfMonth(date.getFullYear(), date.getMonth() + 1) >
  //           date.getDate() &&
  //         isLastDayOfMonth
  //       ) {
  //         date.setDate(date.getDate() + 1);
  //       }
  //     }
  //   }
  //   return datesToReturn;
  // }
};
export const addTasks = (data) => {
  return new Promise((resolve, reject) => {
    var TasksArray = [];
    if (data.repeat === "0") {
      var newTask = {
        start: data.start,
        end: data.end,
        startMin: data.startMin,
        endMin: data.endMin,
        details: data.details,
        priority: data.priority,
        day: data.day,
        month: data.month,
        year: data.year,
        location: data.location,
        repeatbase: null,
        repeat: data.repeat,
      };
      TasksArray.push(newTask);
    } else {
      var repeatedTasks = datesTaskToBeAdded(data).map((date) => {
        var newTask = {
          start: data.start,
          end: data.end,
          startMin: data.startMin,
          endMin: data.endMin,
          details: data.details,
          priority: data.priority,
          day: date.day,
          month: date.month,
          year: date.year,
          location: data.location,
          repeatbase: {
            day: data.day,
            month: data.month,
            year: data.year,
          },
          repeat: data.repeat,
        };
        return newTask;
      });
      TasksArray = repeatedTasks;
    }
    var userId = localStorage.getItem('userId');
    var token = localStorage.getItem('token');
    if(userId && token){
      axios
      .post(
        "/DailyTasks/" +
          data.year +
          "/" +
          data.month +
          "/" +
          userId +
          "/" +
          data.day +
          ".json?auth=" + token,
          TasksArray
      )
      .then((response) => {
        // props.onHide();
        resolve(response);
      })
      .catch((err) => resolve());
    }
    
  });
};
export const deleteTask = (task, date) => {
  return new Promise((resolve, reject) => {
    var Day = date.day,
      Month = date.month,
      Year = date.year;
    if (task.repeatbase) {
      Day = task.repeatbase.day;
      Month = task.repeatbase.month;
      Year = task.repeatbase.year;
    }
    var TaskId = task.id;

    if (TaskId.charAt(0) !== "-") {
      TaskId = TaskId.slice(TaskId.indexOf("-"));
    }
    var userId = localStorage.getItem('userId');
    var token = localStorage.getItem('token');
    if(userId && token){
      axios
      .delete(
        "/DailyTasks/" + Year + "/" + Month +"/" + userId + "/" + Day + "/" + TaskId + ".json?auth=" + token
      )
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        // console.log(">_>_>_>_>_>"+JSON.stringify(err));
      });
    }
  });
};
export const DateOutTime = (dateTime) => {
  var date = new Date(dateTime.getTime());
  date.setHours(0, 0, 0, 0);
  return date;
};
export const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUEST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];
export const rows = [1, 2, 3, 4, 5, 6];
export const dayColumns = [
  { index: 1, weekday: "MONDAY" },
  { index: 2, weekday: "TUESDAY" },
  { index: 3, weekday: "WEDNESDAY" },
  { index: 4, weekday: "THURSDAY" },
  { index: 5, weekday: "FRIDAY" },
  { index: 6, weekday: "SATURDAY" },
  { index: 7, weekday: "SUNDAY" },
];
export const daysInMonth = (Year, Month) => {
  return new Date(Year, Month, 0).getDate();
};
export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};
export const percentage = (num, per) => {
  return (num / 100) * per;
};
export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};
export const formatStopwatchTime = (timer) => {
  const getSeconds = `0${(timer % 60)}`.slice(-2)
  const minutes = `${Math.floor(timer / 60)}`
  const getMinutes = `0${minutes % 60}`.slice(-2)
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

  return `${getHours} : ${getMinutes} : ${getSeconds}`
}
export const formatCountDownTime = (time) => {

  return `${time.hours} : ${time.minutes} : ${time.seconds}`
}