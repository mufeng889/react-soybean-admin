import type { FormInstance } from 'antd';

import { REG_CODE_SIX, REG_EMAIL, REG_PHONE, REG_PWD, REG_USER_NAME } from '@/constants/reg';
import { $t } from '@/locales';

export function useFormRules() {
  const patternRules = {
    code: {
      message: $t('form.code.invalid'),
      pattern: REG_CODE_SIX,
      validateTrigger: 'onChange'
    },
    email: {
      message: $t('form.email.invalid'),
      pattern: REG_EMAIL,
      validateTrigger: 'onChange'
    },
    phone: {
      message: $t('form.phone.invalid'),
      pattern: REG_PHONE,
      validateTrigger: 'onChange'
    },
    pwd: {
      message: $t('form.pwd.invalid'),
      pattern: REG_PWD,
      validateTrigger: 'onChange'
    },
    userName: {
      message: $t('form.userName.invalid'),
      pattern: REG_USER_NAME,
      validateTrigger: 'onChange'
    }
  } satisfies Record<string, App.Global.FormRule>;

  const formRules = {
    code: [createRequiredRule($t('form.code.required')), patternRules.code],
    email: [createRequiredRule($t('form.email.required')), patternRules.email],
    phone: [createRequiredRule($t('form.phone.required')), patternRules.phone],
    pwd: [createRequiredRule($t('form.pwd.required')), patternRules.pwd],
    userName: [createRequiredRule($t('form.userName.required')), patternRules.userName]
  } satisfies Record<string, App.Global.FormRule[]>;

  /** the default required rule */
  const defaultRequiredRule = createRequiredRule($t('form.required'));

  function createRequiredRule(message: string): App.Global.FormRule {
    return {
      message,
      required: true
    };
  }

  /** create a rule for confirming the password */
  function createConfirmPwdRule(from: FormInstance) {
    const confirmPwdRule: App.Global.FormRule[] = [
      { message: $t('form.confirmPwd.required'), required: true },
      {
        message: $t('form.confirmPwd.invalid'),
        validateTrigger: 'onChange',
        validator: (rule, value) => {
          const pwd = from.getFieldValue('password');

          if (value.trim() !== '' && value !== pwd) {
            return Promise.reject(rule.message);
          }
          return Promise.resolve();
        }
      }
    ];
    return confirmPwdRule;
  }

  return {
    createConfirmPwdRule,
    createRequiredRule,
    defaultRequiredRule,
    formRules,
    patternRules
  };
}
