const form: App.I18n.Schema['translation']['form'] = {
  required: 'Cannot be empty',
  userName: {
    required: 'Please enter user name',
    invalid: 'User name format is incorrect'
  },
  phone: {
    required: 'Please enter phone number',
    invalid: 'Phone number format is incorrect'
  },
  pwd: {
    required: 'Please enter password',
    invalid: '6-18 characters, including letters, numbers, and underscores'
  },
  confirmPwd: {
    required: 'Please enter password again',
    invalid: 'The two passwords are inconsistent'
  },
  code: {
    required: 'Please enter verification code',
    invalid: 'Verification code format is incorrect'
  },
  email: {
    required: 'Please enter email',
    invalid: 'Email format is incorrect'
  }
};
export default form;
