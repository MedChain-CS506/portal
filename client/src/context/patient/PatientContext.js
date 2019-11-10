import React, { createContext, useReducer } from 'react';
import PatientReducer from './PatientReducer';
import { GET_PATIENT, GET_RECORDS } from './types';

export const PatientContext = createContext();

const PatientContextProvider = props => {
  const initialState = {
    patients: [],
    patient: {},
    records: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(PatientReducer, initialState);

  const getPatient = async aadhar => {
    // const response = await ...

    dispatch({
      type: GET_PATIENT,
      // payload: response ...
    });
  };

  const getPatientRecords = () => {
    // const response = await ...

    dispatch({
      type: GET_RECORDS,
      // payload: response ...
    });
  };

  return (
    <PatientContext.Provider value={{getPatient, getPatientRecords}}>
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
