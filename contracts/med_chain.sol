pragma solidity ^0.5.8;

contract med_chain {
    
    //global variables
    uint private current_pres_id = 1;
    address private oracle;
    enum auth {doc, phar, admin, oracle}

    //constructor
    constructor() public {
        oracle = msg.sender;
        oracle_auth[msg.sender] = auth.oracle;
    }

    //structs
    struct admin {
        uint id;
        address admin_address;
        bool exists;
    }

    struct patient {
        uint aadhaar;
        string name;
        string dob;
        uint weight;
        string allergies;
        string disease_history;
        uint[] prescription_ids;
        uint[] doctor_ids;
        string sex;
        bool exists;
    }

    struct doctor {
        uint id;
        uint license_no;
        string name;
        string specialisation;
        address doctor_address;
        bool exists;
    }

    struct pharmacy {
        uint id;
        uint license_no;
        address phar_addr;
        bool exists;
    }

    struct prescription {
        uint id;
        uint doctor_id;
        uint patient_aadhaar;
        string disease;
        string symptoms;
        string medicine;
        string timestamp_prescribed;
        uint pharmacy_id;
        string timestamp_marked;
        bool marked;
    }

    //mappings
    mapping(uint => patient) patient_aadhaar_mapping;
    mapping(uint => doctor) doctor_id_mapping;
    mapping(uint => pharmacy) pharmacy_id_mapping;
    mapping(uint => prescription) prescription_id_mapping;
    mapping(uint => admin) admin_id_mapping;
    mapping(address => auth) doctor_auth;
    mapping(address => auth) pharmacy_auth;
    mapping(address => auth) oracle_auth;
    mapping(address => auth) admin_auth;
    
    //events
    event prescription_added(uint aadhaar);

    //modifiers
    modifier only_doctor() {
        if (doctor_auth[msg.sender] == auth.doc) {
            _;
        } else {
            revert("Only Doctors can call this function");
        }
    }

    modifier only_pharmacy() {
        if (pharmacy_auth[msg.sender] == auth.phar) {
            _;
        } else {
            revert("Only Pharmacist can call this function");
        }
    }

    modifier only_admin() {
        if (admin_auth[msg.sender] == auth.admin) {
            _;
        } else {
            revert("Only admin can call this function");
        }
    }
    
    modifier only_oracle() {
        if (oracle_auth[msg.sender] == auth.oracle) {
            _;
        } else {
            revert("Only oracle can call this function");
        }
    }

    //internal functions
    function strConcat(string memory _a, string memory _c) internal pure returns(string memory _concatenatedString) {
        string memory _b = "-";
        string memory abcde = new string(bytes(_a).length + bytes(_b).length + bytes(_c).length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < bytes(_a).length; i++) {
            babcde[k++] = bytes(_a)[i];
        }
        for (uint i = 0; i < bytes(_b).length; i++) {
            babcde[k++] = bytes(_b)[i];
        }
        for (uint i = 0; i < bytes(_c).length; i++) {
            babcde[k++] = bytes(_c)[i];
        }
        return string(babcde);
    }

    function uint2str(uint _i) internal pure returns(string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
    

    //external functions
    function add_patient(uint aadhaar, string memory name, string memory dob, uint weight, string memory sex, string memory allergies) public {
        if(!patient_aadhaar_mapping[aadhaar].exists){
            patient_aadhaar_mapping[aadhaar].aadhaar = aadhaar;
            patient_aadhaar_mapping[aadhaar].name = name;
            patient_aadhaar_mapping[aadhaar].dob = dob;
            patient_aadhaar_mapping[aadhaar].weight = weight;
            patient_aadhaar_mapping[aadhaar].sex = sex;
            patient_aadhaar_mapping[aadhaar].allergies = allergies;
            patient_aadhaar_mapping[aadhaar].exists = true;
        } else {
            revert("Patient already exists in system");
        }
    }

    function edit_patient(uint aadhaar, string memory name, uint weight, string memory sex, string memory allergies) public {
        if(patient_aadhaar_mapping[aadhaar].exists){
            patient_aadhaar_mapping[aadhaar].name = name;
            patient_aadhaar_mapping[aadhaar].weight = weight;
            patient_aadhaar_mapping[aadhaar].sex = sex;
            allergies = strConcat(patient_aadhaar_mapping[aadhaar].allergies, allergies);
            patient_aadhaar_mapping[aadhaar].allergies = allergies;
        } else {
            revert("Patient doesn't exists in system");
        }
    }

    function add_doctor(uint id, uint license_no, string memory name, string memory specialisation, address d_addr) public {
        if(!doctor_id_mapping[id].exists){
            doctor_id_mapping[id].id = id;
            doctor_id_mapping[id].license_no = license_no;
            doctor_id_mapping[id].name = name;
            doctor_id_mapping[id].specialisation = specialisation;
            doctor_id_mapping[id].doctor_address = d_addr;
            doctor_id_mapping[id].exists = true;
            doctor_auth[d_addr] = auth.doc;
        } else {
            revert("Doctor already exists in system");
        }
    }

    function add_pharmacy(uint id, uint license_no, address p_addr) public {
        if(!pharmacy_id_mapping[id].exists){
            pharmacy_id_mapping[id].id = id;
            pharmacy_id_mapping[id].license_no = license_no;
            pharmacy_id_mapping[id].phar_addr = p_addr;
            pharmacy_id_mapping[id].exists = true;
            pharmacy_auth[p_addr] = auth.phar;
        } else {
            revert("Pharmacy already exists in system");
        }
    }
    
    function add_admin(uint id, address admin_address) public {
        if(!doctor_id_mapping[id].exists){
            admin_id_mapping[id].id = id;
            admin_id_mapping[id].admin_address = admin_address;
            admin_auth[admin_address] = auth.admin;
        } else {
            revert("Admin already exists in the system");
        }
    }

    function lookup_patient(uint aadhaar) view public returns(uint, string memory, string memory, string memory, uint, string memory) {
        return (
            patient_aadhaar_mapping[aadhaar].aadhaar,
            patient_aadhaar_mapping[aadhaar].name,
            patient_aadhaar_mapping[aadhaar].sex,
            patient_aadhaar_mapping[aadhaar].dob,
            patient_aadhaar_mapping[aadhaar].weight,
            patient_aadhaar_mapping[aadhaar].allergies
        );
    }

    function doctor_last_prescription(uint aadhaar) view public returns(uint, string memory, uint, string memory, string memory) {
        return (
            prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[patient_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].id,
            prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[patient_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].medicine,
            prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[patient_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].doctor_id,
            prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[patient_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].symptoms,
            prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[patient_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].timestamp_prescribed
        );
    }

    function medical_history_details(uint aadhaar) view public returns(string memory, string memory, string memory) {
        string memory ids = "-";
        string memory d_ids = "-";
        string memory symptoms = "-";
        for (uint i = 0; i < patient_aadhaar_mapping[aadhaar].prescription_ids.length; i++) {
            ids = strConcat(ids, uint2str(prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[i]].id));
            d_ids = strConcat(d_ids, uint2str(prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[i]].doctor_id));
            symptoms = strConcat(symptoms, prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[i]].symptoms);
        }
        return (ids, d_ids, symptoms);
    }

    function medical_history(uint aadhaar) view public returns(string memory, string memory, string memory) {
        string memory dis = "-";
        string memory med = "-";
        string memory time = "-";
        for (uint i = 0; i < patient_aadhaar_mapping[aadhaar].prescription_ids.length; i++) {
            dis = strConcat(dis, prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[i]].disease);
            med = strConcat(med, prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[i]].medicine);
            time = strConcat(time, prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[i]].timestamp_prescribed);
        }
        return (dis, med, time);
    }

    function add_prescription(uint d_id, uint p_aadhar, string memory disease, string memory symptoms, string memory medicine, string memory time) public {
        if(patient_aadhaar_mapping[p_aadhar].exists == true){
            patient_aadhaar_mapping[p_aadhar].prescription_ids.push(current_pres_id);
            prescription_id_mapping[current_pres_id].id = current_pres_id;
            prescription_id_mapping[current_pres_id].doctor_id = d_id;
            prescription_id_mapping[current_pres_id].patient_aadhaar = p_aadhar;
            prescription_id_mapping[current_pres_id].disease = disease;
            prescription_id_mapping[current_pres_id].symptoms = symptoms;
            prescription_id_mapping[current_pres_id].medicine = medicine;
            prescription_id_mapping[current_pres_id].timestamp_prescribed = time;
            prescription_id_mapping[current_pres_id].marked = false;
            current_pres_id = current_pres_id + 1;
            emit prescription_added(p_aadhar);
        } else {
            revert("Patient does not exists");
        }
    }

    function last_prescription(uint aadhaar) view public returns(string memory) {
        if(prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[patient_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].marked == false){
            uint last_presc_id = patient_aadhaar_mapping[aadhaar].prescription_ids[patient_aadhaar_mapping[aadhaar].prescription_ids.length - 1];
            return (prescription_id_mapping[last_presc_id].medicine);
        } else {
            return("Prescription already marked");
        }
    }

    function mark_prescription(uint aadhaar, uint pharmacy_id, string memory time) public {
        if(prescription_id_mapping[patient_aadhaar_mapping[aadhaar].prescription_ids[patient_aadhaar_mapping[aadhaar].prescription_ids.length - 1]].marked == false){
            uint last_presc_id = patient_aadhaar_mapping[aadhaar].prescription_ids[patient_aadhaar_mapping[aadhaar].prescription_ids.length - 1];
            prescription_id_mapping[last_presc_id].pharmacy_id = pharmacy_id;
            prescription_id_mapping[last_presc_id].marked = true;
            prescription_id_mapping[last_presc_id].timestamp_marked = time;
        } else {
            revert("Prescription already marked");
        }        
    }

}