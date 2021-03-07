import {
  MONTHLY_TASKS_LOADED,
  DAILY_TASKS_LOADED,
  SET_CURRENT_DATE,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
  SET_CALENDAR_MODE
} from "../constants/action-types";
import axios from "../../axios-calendar";

export function setCalendarMode(payload) {
  return { type: SET_CALENDAR_MODE, payload };
}

export function setCurrentDate(payload) {
  return { type: SET_CURRENT_DATE, payload };
}
export function getMonthlyTasks(currentYear, currentMonth) {
  //console.log(":::::::::::::> ",currentYear, currentMonth);
  return function (dispatch) {
    var userId = localStorage.getItem('userId');
    var token = localStorage.getItem('token');
    if(userId  && token){
      axios
      .get("/DailyTasks/" + currentYear + "/" + currentMonth+ "/" + userId + ".json?auth=" + token)
      .then((res) => {
        // console.log("Monthly Tasks>>++ ",JSON.stringify(res.data));
        const fetchedTasks = [];
        for (let dateIndex in res.data) {
          for (let idIndex in res.data[dateIndex]) {
            if (Array.isArray(res.data[dateIndex][idIndex])) {
              for (let key2 in res.data[dateIndex][idIndex]) {
                if (
                  res.data[dateIndex][idIndex][key2].month === currentMonth &&
                  res.data[dateIndex][idIndex][key2].year === currentYear
                ) {
                  fetchedTasks.push({
                    ...res.data[dateIndex][idIndex][key2],
                    id: key2 + idIndex,
                  });
                }
              }
            }
            // else if (
            //   res.data[dateIndex][idIndex].month === currentMonth &&
            //   res.data[dateIndex][idIndex].year === currentYear
            // ) {
            //   fetchedTasks.push({
            //     ...res.data[dateIndex][idIndex],
            //     id: idIndex,
            //   });
            // }
          }
        }
        fetchedTasks.sort(function (a, b) {
          return a.start - b.start;
        });
        return fetchedTasks;
      })
      .then((fetchedTasks) => {
        dispatch({ type: MONTHLY_TASKS_LOADED, payload: fetchedTasks });
      })
      .catch((err) => {
        // console.log(err);
      });
    }
    
  };
}
export function getDailyTasks(currentYear, currentMonth, currentDay) {
  currentDay = currentDay ? currentDay : 1;
  return function (dispatch) {
    var userId = localStorage.getItem('userId');
    var token = localStorage.getItem('token');
    if(userId && token){
      axios
      .get("/DailyTasks/" + currentYear + "/" + currentMonth + "/" + userId + ".json?auth=" + token)
      .then((res) => {
        const fetchedTasks = [];
        for (let dateIndex in res.data) {
          for (let idIndex in res.data[dateIndex]) {
            if (Array.isArray(res.data[dateIndex][idIndex])) {
              for (let repeatIndex in res.data[dateIndex][idIndex]) {
                if (
                  res.data[dateIndex][idIndex][repeatIndex].month === currentMonth &&
                  res.data[dateIndex][idIndex][repeatIndex].year === currentYear &&
                  res.data[dateIndex][idIndex][repeatIndex].day === currentDay
                ) {
                  fetchedTasks.push({
                    ...res.data[dateIndex][idIndex][repeatIndex],
                    id: repeatIndex + idIndex,
                  });
                }
                // if(res.data[dateIndex][idIndex][repeatIndex].repeatbase && 
                //   res.data[dateIndex][idIndex][repeatIndex].repeatbase.day===currentDay &&
                //   res.data[dateIndex][idIndex][repeatIndex].repeatbase.month===currentMonth &&
                //   res.data[dateIndex][idIndex][repeatIndex].repeatbase.year===currentYear){
                //     fetchedTasks.push({
                //       ...res.data[dateIndex][idIndex][repeatIndex],
                //       id: repeatIndex + idIndex,
                //     });
                // }
              }
            }
            // else if (
            //   res.data[dateIndex][idIndex].month === currentMonth &&
            //   res.data[dateIndex][idIndex].year === currentYear
            // ) {
            //   fetchedTasks.push({
            //     ...res.data[dateIndex][idIndex],
            //     id: idIndex,
            //   });
            // }
          }
        }
        fetchedTasks.sort(function (a, b) {
          return a.start - b.start;
        });
        //console.log("Daily Tasks>> ",JSON.stringify(fetchedTasks));
        return fetchedTasks;
      })
      .then((fetchedTasks) => {
        dispatch({ type: DAILY_TASKS_LOADED, payload: fetchedTasks });
      })
      .catch((err) => {
        // console.log(err);
      });
    }
  };
}
export const authSuccess = (token, userId) => {
  return {
      type: AUTH_SUCCESS,
      idToken: token,
      userId: userId
  };
};
export const auth = (email, password, isSignup) => {
  return dispatch => {
      const authData = {
          email: email,
          password: password,
          returnSecureToken: true
      };
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOXogDHobbjBd0bPs9SwbOJNizmAGG_1E';
      if (!isSignup) {
          url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOXogDHobbjBd0bPs9SwbOJNizmAGG_1E';
      }
      axios.post(url, authData)
          .then(response => {
              // console.log(response.data);
              const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
              localStorage.setItem('token', response.data.idToken);
              localStorage.setItem('expirationDate', expirationDate);
              localStorage.setItem('userId', response.data.localId);
              dispatch(authSuccess(response.data.idToken, response.data.localId));
              dispatch(checkAuthTimeout(response.data.expiresIn));
          })
          .catch(err => {
              //dispatch(authFail(err.response.data.error));
          });
  };
};
export const changeEmail = (newEmail) => {
  return dispatch => {
      const authData = {
          idToken:localStorage.getItem('token'),
          email: newEmail,
          returnSecureToken: true
      };
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOXogDHobbjBd0bPs9SwbOJNizmAGG_1E';
      axios.post(url, authData)
          .then(response => {
              // console.log("ChangeEmail>>> "+JSON.stringify(response.data));
              const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
              localStorage.setItem('token', response.data.idToken);
              localStorage.setItem('expirationDate', expirationDate);
              localStorage.setItem('userId', response.data.localId);
              dispatch(authSuccess(response.data.idToken, response.data.localId));
              dispatch(checkAuthTimeout(response.data.expiresIn));
          })
          .catch(err => {
              // console.log(err);
              //dispatch(authFail(err.response.data.error));
          });
  };
};
export const changePassword = (newPassword) => {
  return dispatch => {
      const authData = {
          idToken: localStorage.getItem('token'),
          password: newPassword,
          returnSecureToken: true
      };
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOXogDHobbjBd0bPs9SwbOJNizmAGG_1E';
      axios.post(url, authData)
          .then(response => {
              // console.log("ChangePassword>>> " + JSON.stringify(response.data));
              const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
              localStorage.setItem('token', response.data.idToken);
              localStorage.setItem('expirationDate', expirationDate);
              localStorage.setItem('userId', response.data.localId);
              dispatch(authSuccess(response.data.idToken, response.data.localId));
              dispatch(checkAuthTimeout(response.data.expiresIn));
          })
          .catch(err => {
              // console.log(err);
              //dispatch(authFail(err.response.data.error));
          });
  };
};
export const logout = () => {
  // console.log("Logout...");
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  return {
      type: AUTH_LOGOUT
  };
};
export const setAuthRedirectPath = (path) => {
  return {
      type: SET_AUTH_REDIRECT_PATH,
      path: path
  };
};
export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
          dispatch(logout());
      } else {
          const userId = localStorage.getItem('userId');
          dispatch(authSuccess(token, userId));
          const expirationDate = new Date(localStorage.getItem('expirationDate'));
          if (expirationDate <= new Date()) {
              dispatch(logout());
          } else {
              const userId = localStorage.getItem('userId');
              dispatch(authSuccess(token, userId));
              dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
          }   
      }
  };
};
export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
      setTimeout(() => {
          dispatch(logout());
      }, expirationTime * 1000);
  };
};