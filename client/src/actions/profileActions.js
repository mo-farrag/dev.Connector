import axios from "axios";
import {
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
} from "./types";

export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) => dispatch({ type: GET_PROFILE, payload: {} }));
};

// create profile
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/profile", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

//delete account and profile
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure? this can not be undone!")) {
    axios
      .delete("/api/profile")
      .then((res) => dispatch({ type: SET_CURRENT_USER, payload: {} })) // logout current user
      .catch((err) => dispatch({ type: GET_ERRORS, payload: err }));
  }
};
