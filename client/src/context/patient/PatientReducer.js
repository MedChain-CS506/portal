import {
  SEARCH_PATIENTS,
  GET_PATIENT,
  GET_RECORDS,
  CLEAR_PATIENTS,
  SET_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_PATIENTS:
      return {
        ...state,
        patients: action.payload,
        loading: false,
      };

    case GET_PATIENT:
      return {
        ...state,
        patient: action.payload,
        loading: false,
      };

    case CLEAR_PATIENTS:
      return {
        ...state,
        patients: [],
        loading: false,
      };

    case GET_RECORDS:
      return {
        ...state,
        records: action.payload,
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
