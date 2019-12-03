import React from 'react';
import PatientContext from './PatientContext';

const PatientState = props => {
  const getPatient = async (contract, aadhaar) => {
    async function temp(contract, aadhaar) {
      const patientPageData = {};
      try {
        await contract.contract.methods
          .lookup_patient(aadhaar)
          .call()
          .then(function(res) {
            patientPageData.aadhaar = res[0];
            patientPageData.name = res[1];
            patientPageData.sex = res[2];
            patientPageData.dob = res[3];
            patientPageData.weight = res[4];
            patientPageData.allergies = res[5];
          });
      } catch (error) {
        patientPageData.aadhaar = 0;
        patientPageData.name = '';
        patientPageData.sex = '';
        patientPageData.dob = '';
        patientPageData.weight = 0;
        patientPageData.allergies = '';
      }
      return patientPageData;
    }
    const res = await temp(contract, aadhaar);
    return res;
  };

  const lastPrescription = async (contract, aadhaar) => {
    const patientPageData = {};
    try {
      await contract.contract.methods
        .doctor_last_prescription(aadhaar)
        .call()
        .then(function(res) {
          patientPageData.last_pres_id = res[0];
          patientPageData.last_pres_medicine = res[1];
          patientPageData.last_pres_doc_id = res[2];
          patientPageData.last_pres_symptoms = res[3];
          patientPageData.last_pres_timestamp = res[4];
        });
    } catch (error) {
      patientPageData.last_pres_id = 0;
      patientPageData.last_pres_medicine = '';
      patientPageData.last_pres_doc_id = 0;
      patientPageData.last_pres_symptoms = '';
      patientPageData.last_pres_timestamp = '';
    }
    return patientPageData;
  };

  const getPatientRecords = async (contract, aadhaar) => {
    async function medical_history(contract, aadhaar) {
      function getString(str) {
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
            medical_hist.pres_ids = getString(res[0]).map(Number);
            medical_hist.doctor_ids = getString(res[1]).map(Number);
            medical_hist.symptoms = getString(res[2]);
          });
        await contract.contract.methods
          .medical_history(aadhaar)
          .call()
          .then(function(res) {
            medical_hist.disease = getString(res[0]);
            medical_hist.medicine = getString(res[1]);
            medical_hist.timestamp = getString(res[2]);
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
    d_id,
    aadhaar,
    disease,
    symptoms,
    medicine,
    time
  ) => {
    await contract.contract.methods
      .add_prescription(d_id, aadhaar, disease, symptoms, medicine, time)
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
    const pharmacyPortal = {};
    try {
      await contract.contract.methods
        .last_prescription(aadhaar)
        .call()
        .then(function(res) {
          pharmacyPortal.d_id = res[0];
          pharmacyPortal.medicine = res[1];
          pharmacyPortal.timestamp = res[2];
        });
    } catch (error) {
      pharmacyPortal.d_id = 0;
      pharmacyPortal.medicine = '';
      pharmacyPortal.timestamp = '';
    }
    return pharmacyPortal;
  };

  const markPrescription = async (contract, aadhaar, pharmId, time) => {
    try {
      await contract.contract.methods
        .mark_prescription(aadhaar, pharmId, time)
        .send(
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
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientState;
