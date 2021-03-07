import {
  ADD_TASK,
  FOUND_BAD_WORD,
  MONTHLY_TASKS_LOADED,
  DAILY_TASKS_LOADED,
  SET_CURRENT_DATE,
  DELETE_TASK,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
  SET_CALENDAR_MODE
} from "../constants/action-types";

import { updateObject } from "../../Utilities";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
  dailytasks: [],
  monthlytasks: [],
  currentDate: null,
  calendarMode: true
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_TASK) {
    return { ...state, monthlytasks: [...state.monthlytasks, action.payload] };
  } else if (action.type === DELETE_TASK) {
    // console.log("Delete - action.payload: " + JSON.stringify(action.payload));
    return {
      ...state,
      monthlytasks: state.monthlytasks.filter(
        (x) => x.id !== action.payload.id.slice(action.payload.id.indexOf("-"))
      ),
    };
  } else if (action.type === SET_CURRENT_DATE) {
    return { ...state, currentDate: action.payload };
  } else if (action.type === FOUND_BAD_WORD) {
    console.log("Bad word found in article...");
    return state;
  } else if (action.type === MONTHLY_TASKS_LOADED) {
    return Object.assign({}, state, {
      monthlytasks: action.payload,
    });
  } else if (action.type === DAILY_TASKS_LOADED) {
    return Object.assign({}, state, {
      dailytasks: action.payload,
    });
  } else if (action.type === AUTH_SUCCESS) {
    return authSuccess(state, action);
  } else if (action.type === AUTH_LOGOUT) {
    return authLogout(state, action);
  } else if (action.type === SET_AUTH_REDIRECT_PATH) {
    return setAuthRedirectPath(state, action);
  } else if(action.type === SET_CALENDAR_MODE){
    return { ...state, calendarMode: action.payload };
  }
  return state;
}
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
  });
};
const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null, dailytasks: [], monthlytasks: [] });
};
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

export default rootReducer;
