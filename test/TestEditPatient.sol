pragma solidity ^0.5.8;
//import "remix_tests.sol";
import "../contracts/med_chain.sol";

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";


contract TestEditPatient {
    
    med_chain private testContract;
 
    //address private testAddress = 0x8881c6CFFDA34224E0B3cc62eaeeF56cCe28Aad7;
    
    // patient's info for use with add_patient
    uint aadhaar = 1;
    string name = "name";
    string dob = "dob";
    uint weight = 150;
    string sex = "sex"; 
    string allergies = "allergies";
    // patient's new info to update with
    uint aadhaar2 = 2;
    string name2 = "name2";
    uint weight2 = 152;
    string sex2 = "sex2"; 
    string allergies2 = "allergies2";
    string allAllergies = "allergies-allergies2";
    
    // resulted patient info after function call
    uint res_aadhaar;
    string res_name;
    string res_dob;
    uint res_weight;
    string res_sex; 
    string res_allergies;
    
    // // doc perscriptoin info for use with add_prescription
    // uint d_id = 2;
    // uint p_id = 0;
    // string disease = "disease";
    // string symptoms = "symptoms";
    // string medicine = "medicine";
    // //string time = "time";
    // string timestamp_prescribed = "time";
    
    // // resulted perscriptoin info after function call
    // uint res_p_id;
    // string  res_medicine;
    // string  res_symptoms;
    // uint res_d_id;
    // string res_timestamp_prescribed;
  
    // // medical history details params
    // string ids = "--1";
    // uint per_ids = 1;
    // string d_ids = "--2";
    // string symptoms_ = "--symptoms";
    // // medical history params
    // string dis_ = "--disease";
    // string med_ = "--medicine";
    // string time_ = "--time";

    // // resulted history after function call
    // uint res_per_ids;
    // string res_d_ids;
    // string res_ids;
    // string res_dis_;
    // string res_med_;
    // string res_time_;

    // creating a contract instance and calling add_patient and add_prescription
    // also, forcing it to run before any tests (remix runs tests alphabatically)
    function beforeAll() external {
        testContract = new med_chain();
        testContract.add_patient(aadhaar, name, dob, weight, sex, allergies);
        //testContract.add_prescription(d_id, aadhaar, disease, symptoms, medicine, timestamp_prescribed);
    }

  //test it against editing the patient's info --- NOT WORKING <OUT OF GAS> 
  function testLookUpAfterEditPatient() external {
    //  testContract = new med_chain();
      // call the edit_patient with new info
      testContract.edit_patient(aadhaar, name2, weight2, sex2, allergies2);
      (res_aadhaar, res_name, res_sex, res_dob, res_weight, res_allergies) = testContract.lookup_patient(aadhaar);
      //Assert.equal(aadhaar2, res_aadhaar, "Pateint's aadhaar does not match");
      //Assert.equal(age, res_age, "Pateint's age does not match");
      Assert.equal(name2, res_name, "Pateint's name does not match");
      Assert.equal(weight2, res_weight, "Pateint's weight does not match");
      Assert.equal(sex2, res_sex, "Pateint's sex does not match");
      Assert.equal(allAllergies, res_allergies, "Pateint's allergies does not match");

      //reset the info for the patient
      //testContract.edit_patient(aadhaar, name, weight, sex, allergies);
  }
}