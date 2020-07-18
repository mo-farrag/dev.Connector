import {
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
} from "../actions/types";
import { clearCurrentProfile } from "../actions/profileActions";

const initialState = {
  post: {},
  posts: [],
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
}
