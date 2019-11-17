//! Use this for validation
//! Maybe move over aadhaar.js into this...
//! If this doesn't work, then stick with Yup
//! make sure to find validation for date, weight, sex

const constraints = {
  firstName: {
    presence: {
      allowEmpty: false,
    },

    type: 'string',

    format: {
      pattern: '[a-z]',
      flags: 'i', // allows for upper and lower case
      message: 'first name can only contain letters',
    },
  },

  lastName: {
    presence: {
      allowEmpty: false,
    },

    type: 'string',

    format: {
      pattern: '[a-z]',
      flags: 'i', // allows for upper and lower case
      message: 'last name can only contain letters',
    },
  },

  aadhaar: {
    number: {
      message: '^Aadhaar  is invalid',
    },

    length: {
      is: 12,
    },

    presence: {
      allowEmpty: false,
    },

    type: 'number',
  },

  aadhaarConfirmation: {
    aadhaar: {
      message: '^Aadhaar confirmation is invalid',
    },

    equality: {
      attribute: 'aadhaar',
      message: '^Aadhaar Confirmation is not equal to Aadhaar',
    },

    presence: {
      allowEmpty: false,
    },

    type: 'number',
  },

  // dob: {
  //   presence: true,
  // },

  // sex: {
  //   presence: true,
  // },

  // weight: {
  //   presence: true,
  // },
};

export default constraints;
