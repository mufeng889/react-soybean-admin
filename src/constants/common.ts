import { transformRecordToOption } from '@/utils/common';

export const yesOrNoRecord: Record<CommonType.YesOrNo, App.I18n.I18nKey> = {
  N: 'common.yesOrNo.no',
  Y: 'common.yesOrNo.yes'
};

export const yesOrNoOptions = transformRecordToOption(yesOrNoRecord);

export const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export const ATG_MAP: Record<Api.Common.EnableStatus, string> = {
  1: 'success',
  2: 'warning'
};

export const YesOrNo_Map: Record<CommonType.YesOrNo, string> = {
  N: 'default',
  Y: 'error'
};
