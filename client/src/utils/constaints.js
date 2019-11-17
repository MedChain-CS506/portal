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
  },

  lastName: {
    presence: {
      allowEmpty: false,
    },

    type: 'string',
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

    type: 'string',
  },

  aadharConfirmation: {
    aadhar: {
      message: '^Aadhar confirmation is invalid',
    },

    equality: {
      attribute: 'aadhaar',
      message: '^Aadhar Confirmation is not equal to Aadhar',
    },

    presence: {
      allowEmpty: false,
    },

    type: 'string',
  },
};

export default constraints;
