pragma solidity ^0.5.8;
//import "remix_tests.sol";
import "../contracts/med_chain.sol";

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";


contract TestLookUp {
    
    med_chain private testContract;
    
    // patient's info for use with add_patient
    uint aadhaar = 1;
    string name = "name";
    string dob = "dob";
    uint weight = 150;
    string sex = "sex"; 
    string allergies = "allergies";
    
    // resulted patient info after function call
    uint res_aadhaar;
    string res_name;
    string res_dob;
    uint res_weight;
    string res_sex; 
    string res_allergies;
    
    // doc perscriptoin info for use with add_prescription
    uint d_id = 2;
    uint p_id = 0;
    string disease = "disease";
    string symptoms = "symptoms";
    string medicine = "medicine";
    string timestamp_prescribed = "time";
    
    // resulted perscriptoin info after function call
    uint res_p_id;
    string  res_medicine;
    string  res_symptoms;
    uint res_d_id;
    string res_timestamp_prescribed;
  
    // creating a contract instance and calling add_patient and add_prescription
    // also, forcing it to run before any tests (remix runs tests alphabatically)
    function beforeEach() external {
        testContract = new med_chain();
        testContract.add_patient(aadhaar, name, dob, weight, sex, allergies);
    }

    // test lookup_patient
    function testLookUppatient() external {
      //  testContract = new med_chain();
        (res_aadhaar, res_name, res_sex, res_dob, res_weight, res_allergies) = testContract.lookup_patient(aadhaar);
        Assert.equal(aadhaar, res_aadhaar, "Pateint's aadhaar does not match");
        //Assert.equal(age, res_age, "Pateint's age does not match");
        Assert.equal(name, res_name, "Pateint's name does not match");
        Assert.equal(dob, res_dob, "Pateint's dob does not match");
        Assert.equal(weight, res_weight, "Pateint's weight does not match");
        Assert.equal(sex, res_sex, "Pateint's sex does not match");
        Assert.equal(allergies, res_allergies, "Pateint's allergies does not match");
    }
}