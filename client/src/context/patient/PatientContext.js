import React, { createContext, useReducer } from 'react';
import PatientReducer from './PatientReducer';
import {
  SEARCH_PATIENTS,
  GET_PATIENT,
  GET_RECORDS,
  CLEAR_PATIENTS,
  SET_LOADING,
} from './types';

export const PatientContext = createContext();

const PatientContextProvider = props => {
  const initialState = {
    patients: [],
    patient: {},
    records: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(PatientReducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  // ! THESE FUNCTIONS SHOULD BE WHERE WE FETCH INFORMATION FROM THE BLOCKCHAIN
  const searchPatients = async text => {
    setLoading();

    //const response = await ...//! from some url

    dispatch({
      type: SEARCH_PATIENTS,
      // payload: response...
    });
  };

  const getPatient = async aadhar => {
    setLoading();

    // const response = await ... //! from some url

    dispatch({
      type: GET_PATIENT,
      // payload: response ...
    });
  };

  const getPatientRecords = () => {
    setLoading();

    // const response = await ...

    dispatch({
      type: GET_RECORDS,
      // payload: response ...
    });
  };

  const clearPatients = () => dispatch({ type: CLEAR_PATIENTS });

  return (
    <PatientContext.Provider
      value={
        (searchPatients, clearPatients, getPatient, getPatientRecords)
        // (patients,
        //   patient,
        //   records,
        //   loading,
        //   searchPatients,
        //   clearPatients,
        //   getPatient,
        //   getPatientRecords) // ! TO AVOID ESLINT... WILL BE USED WHEN WE GET DATA
      }
    >
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
