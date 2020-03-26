import { GET_PROFILE, PROFILE_LOADING } from "../actions/types";
import { clearCurrentProfile } from "../actions/profileActions";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case clearCurrentProfile:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
