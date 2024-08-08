const form: App.I18n.Schema['translation']['form'] = {
  required: '不能为空',
  userName: {
    required: '请输入用户名',
    invalid: '用户名格式不正确'
  },
  phone: {
    required: '请输入手机号',
    invalid: '手机号格式不正确'
  },
  pwd: {
    required: '请输入密码',
    invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
  },
  confirmPwd: {
    required: '请输入确认密码',
    invalid: '两次输入密码不一致'
  },
  code: {
    required: '请输入验证码',
    invalid: '验证码格式不正确'
  },
  email: {
    required: '请输入邮箱',
    invalid: '邮箱格式不正确'
  }
};

export default form;
