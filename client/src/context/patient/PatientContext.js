import React, { createContext, useReducer } from 'react';
import PatientReducer from './PatientReducer';
import { GET_PATIENT, GET_RECORDS } from './types';
import getWeb3 from '../../utils/getWeb3';
import MedChainContract from '../../contracts/med_chain.json';


export const PatientContext = createContext();

const PatientContextProvider = props => {
  const initialState = {
    patients: [],
    patient: {},
    records: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(PatientReducer, initialState);

  async function connectMetamask() {
    try {
      console.log('its going');
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MedChainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        MedChainContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      console.log("got data");
      let data = {
        accounts: accounts,
        web3: web3,
        contract: instance
      };
      return data
    } catch (error) {
      console.error(error);
    }      
  }

  const getPatient = aadhaar => {

    // async function temp(contract_instance, aadhaar) {
    //   let paitent_page_data = {};
    //   await contract_instance.contract.methods.lookup_paitent(aadhaar).call().then(function(res) {
    //     paitent_page_data.aadhaar = res[0];
    //     paitent_page_data.age = res[1];
    //     paitent_page_data.name = res[2];
    //     paitent_page_data.sex = res[3];
    //     paitent_page_data.dob = res[4];
    //     paitent_page_data.weight = res[5];
    //     paitent_page_data.allergies = res[6];
    //     // await contract_instance.contract.methods.doctor_last_prescription(aadhaar).call().then(function(res) {
    //     //     paitent_page_data.last_pres_id = res[0];
    //     //     paitent_page_data.last_pres_medicine = res[1];
    //     //     paitent_page_data.last_pres_doc_id = res[2];
    //     //     paitent_page_data.last_pres_symptoms = res[3];
    //     //     paitent_page_data.last_pres_timestamp = res[4];
    //     // });
    //   });
    //   return paitent_page_data;
    // }

    // connectMetamask().then((data) => {
    //   const res = temp(data, aadhaar);
    //   console.log(res);
    //   console.log("inside patient context get block")
    // });
    console.log("inside getpatient");

    // dispatch({
    //   type: GET_PATIENT,
    //   //payload: response,
    // });
  };

  const getPatientRecords = () => {
    // const response = await ...

    dispatch({
      type: GET_RECORDS,
      // payload: response ...
    });
  };

  return (
    <PatientContext.Provider value={{getPatient}}>
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;
