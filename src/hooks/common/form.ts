import type { FormInstance } from 'antd';
import { REG_CODE_SIX, REG_EMAIL, REG_PHONE, REG_PWD, REG_USER_NAME } from '@/constants/reg';
import { $t } from '@/locales';
export function useFormRules() {
  const patternRules = {
    userName: {
      pattern: REG_USER_NAME,
      message: $t('form.userName.invalid'),
      validateTrigger: 'onChange'
    },
    phone: {
      pattern: REG_PHONE,
      message: $t('form.phone.invalid'),
      validateTrigger: 'onChange'
    },
    pwd: {
      pattern: REG_PWD,
      message: $t('form.pwd.invalid'),
      validateTrigger: 'onChange'
    },
    code: {
      pattern: REG_CODE_SIX,
      message: $t('form.code.invalid'),
      validateTrigger: 'onChange'
    },
    email: {
      pattern: REG_EMAIL,
      message: $t('form.email.invalid'),
      validateTrigger: 'onChange'
    }
  } satisfies Record<string, App.Global.FormRule>;

  const formRules = {
    userName: [createRequiredRule($t('form.userName.required')), patternRules.userName],
    phone: [createRequiredRule($t('form.phone.required')), patternRules.phone],
    pwd: [createRequiredRule($t('form.pwd.required')), patternRules.pwd],
    code: [createRequiredRule($t('form.code.required')), patternRules.code],
    email: [createRequiredRule($t('form.email.required')), patternRules.email]
  } satisfies Record<string, App.Global.FormRule[]>;

  /** the default required rule */
  const defaultRequiredRule = createRequiredRule($t('form.required'));

  function createRequiredRule(message: string): App.Global.FormRule {
    return {
      required: true,
      message
    };
  }

  /** create a rule for confirming the password */
  function createConfirmPwdRule(from: FormInstance) {
    const confirmPwdRule: App.Global.FormRule[] = [
      { required: true, message: $t('form.confirmPwd.required') },
      {
        validator: (rule, value) => {
          const pwd = from.getFieldValue('password');

          if (value.trim() !== '' && value !== pwd) {
            return Promise.reject(rule.message);
          }
          return Promise.resolve();
        },
        message: $t('form.confirmPwd.invalid'),
        validateTrigger: 'onChange'
      }
    ];
    return confirmPwdRule;
  }

  return {
    patternRules,
    formRules,
    defaultRequiredRule,
    createRequiredRule,
    createConfirmPwdRule
  };
}
