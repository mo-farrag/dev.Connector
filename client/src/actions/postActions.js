import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
} from "./types";

// Add Post
export const addPost = (postData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get Posts
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS, // not calling GET_ERRORS as we are not using a form to display errors
        payload: null,
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
