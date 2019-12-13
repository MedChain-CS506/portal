import React, { useState } from 'react';
import PatientContext from './PatientContext';

const PatientState = props => {
  const [aadhaar, setAadhaar] = useState(null);
  const getPatient = async (contract, aadhaar) => {
    async function temp(contract, aadhaar) {
      const paitent_page_data = {};
      try {
        await contract.contract.methods
          .lookup_patient(aadhaar)
          .call()
          .then(function(res) {
            paitent_page_data.aadhaar = res[0];
            paitent_page_data.name = res[1];
            paitent_page_data.sex = res[2];
            paitent_page_data.dob = res[3];
            paitent_page_data.weight = res[4];
            paitent_page_data.allergies = res[5];
          });
      } catch (error) {
        paitent_page_data.aadhaar = 0;
        paitent_page_data.name = '';
        paitent_page_data.sex = '';
        paitent_page_data.dob = '';
        paitent_page_data.weight = 0;
        paitent_page_data.allergies = '';
      }
      return paitent_page_data;
    }
    const res = await temp(contract, aadhaar);
    return res;
  };

  const lastPrescription = async (contract, aadhaar) => {
    const paitent_page_data = {};
    try {
      await contract.contract.methods
        .doctor_last_prescription(aadhaar)
        .call()
        .then(function(res) {
          paitent_page_data.last_pres_id = res[0];
          paitent_page_data.last_pres_medicine = res[1];
          paitent_page_data.last_pres_doc_id = res[2];
          paitent_page_data.last_pres_symptoms = res[3];
          paitent_page_data.last_pres_timestamp = res[4];
        });
    } catch (error) {
      paitent_page_data.last_pres_id = 0;
      paitent_page_data.last_pres_medicine = '';
      paitent_page_data.last_pres_doc_id = 0;
      paitent_page_data.last_pres_symptoms = '';
      paitent_page_data.last_pres_timestamp = '';
    }
    return paitent_page_data;
  };

  const getPatientRecords = async (contract, aadhaar) => {
    async function medical_history(contract, aadhaar) {
      function get_string(str) {
        const newStr = str.split('-');
        newStr.splice(0, 2);
        return newStr;
      }
      const medical_hist = {};
      try {
        await contract.contract.methods
          .medical_history_details(aadhaar)
          .call()
          .then(function(res) {
            medical_hist.pres_ids = get_string(res[0]).map(Number);
            medical_hist.doctor_ids = get_string(res[1]).map(Number);
            medical_hist.symptoms = get_string(res[2]);
          });
        await contract.contract.methods
          .medical_history(aadhaar)
          .call()
          .then(function(res) {
            medical_hist.disease = get_string(res[0]);
            medical_hist.medicine = get_string(res[1]);
            medical_hist.timestamp = get_string(res[2]);
          });
        return medical_hist;
      } catch (error) {
        medical_hist.pres_ids = 0;
        medical_hist.doctor_ids = 0;
        medical_hist.symptoms = '';
        medical_hist.disease = '';
        medical_hist.medicine = '';
        medical_hist.timestamp = '';
        console.log(error);
        return medical_hist;
      }
    }
    const response = await medical_history(contract, aadhaar);
    return response;
  };

  const addPatient = async (
    contract,
    aadhaar,
    name,
    dob,
    weight,
    sex,
    allergies
  ) => {
    await contract.contract.methods
      .add_patient(aadhaar, name, dob, weight, sex, allergies)
      .send(
        {
          from: contract.accounts[0],
        },
        error => {
          console.log(error);
        }
      );
  };

  const addPrescription = async (
    contract,
    aadhaar,
    disease,
    symptoms,
    medicine,
    time
  ) => {
    await contract.contract.methods
      .add_prescription(aadhaar, disease, symptoms, medicine, time)
      .send(
        {
          from: contract.accounts[0],
        },
        error => {
          console.log(error);
        }
      );
  };

  const editPatient = async (
    contract,
    aadhaar,
    name,
    weight,
    sex,
    allergies
  ) => {
    await contract.contract.methods
      .edit_patient(aadhaar, name, weight, sex, allergies)
      .send(
        {
          from: contract.accounts[0],
        },
        error => {
          console.log(error);
        }
      );
  };

  const phatmacistLastPrescription = async (contract, aadhaar) => {
    const pharmacy_portal = {};
    try {
      await contract.contract.methods
        .last_prescription(aadhaar)
        .call()
        .then(function(res) {
          pharmacy_portal.d_id = res[0];
          pharmacy_portal.medicine = res[1];
          pharmacy_portal.timestamp = res[2];
        });
    } catch (error) {
      pharmacy_portal.d_id = 0;
      pharmacy_portal.medicine = '';
      pharmacy_portal.timestamp = '';
    }
    return pharmacy_portal;
  };

  const markPrescription = async (contract, aadhaar, time) => {
    try {
      await contract.contract.methods.mark_prescription(aadhaar, time).send(
        {
          from: contract.accounts[0],
        },
        error => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addFile = async (contract, aadhaar, filehash, timestamp) => {
    await contract.contract.methods.add_file(aadhaar, filehash, timestamp).send(
      {
        from: contract.accounts[0],
      },
      error => {
        console.log(error);
      }
    );
  };

  const getfiles = async (contract, aadhaar) => {
    const files = {};
    try {
      await contract.contract.methods
        .get_files(aadhaar)
        .call()
        .then(function(res) {
          files.filehash = res[0];
          files.timestamp = res[1];
        });
    } catch (error) {
      files.filehash = '';
      files.timestamp = '';
    }
    return files;
  };

  const setAadhaarState = (aadhaar) => {
    setAadhaar(aadhaar);
  }

  const getAadhaarState = () => {
    return aadhaar;
  }

  return (
    <PatientContext.Provider
      value={{
        getPatient,
        getPatientRecords,
        addPatient,
        addPrescription,
        lastPrescription,
        editPatient,
        phatmacistLastPrescription,
        markPrescription,
        addFile,
        getfiles,
        setAadhaarState,
        getAadhaarState,
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientState;
