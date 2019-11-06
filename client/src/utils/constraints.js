const constraints = {
  firstName: {
    presence: {
      allowEmpty: false
    },

    type: 'string'
  },

  lastName: {
    presence: {
      allowEmpty: false
    },

    type: 'string'
  },

  email: {
    email: {
      message: '^E-mail address is invalid'
    },

    presence: {
      allowEmpty: false
    },

    type: 'string'
  },

  password: {
    length: {
      minimum: 6
    },

    presence: {
      allowEmpty: false
    },

    type: 'string'
  },

  passwordConfirmation: {
    equality: 'password',

    length: {
      minimum: 6
    },

    presence: {
      allowEmpty: false
    },

    type: 'string'
  },
}

export default constraints;