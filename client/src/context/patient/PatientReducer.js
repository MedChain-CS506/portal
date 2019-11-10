import {
  GET_PATIENT,
  GET_RECORDS
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_PATIENT:
      return {
        ...state,
        patient: action.payload
      };

    case GET_RECORDS:
      return {
        ...state,
        records: action.payload
      };

    default:
      return state;
  }
};
