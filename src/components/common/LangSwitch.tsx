import { Dropdown } from 'antd';
import { changeLocale, getLocale, getLocaleOptions } from '@/store/slice/app';
import ButtonIcon from '../custom/button-icon';
interface Props {
  /** Show tooltip */
  showTooltip?: boolean;
}

const LangSwitch: FC<Props> = memo(({ showTooltip = true }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const locale = useAppSelector(getLocale);
  const localeOptions = useAppSelector(getLocaleOptions);

  const tooltipContent = showTooltip ? t('icon.lang') : '';

  function changeLocales({ key }: { key: string }) {
    dispatch(changeLocale(key as App.I18n.LangType));
  }

  return (
    <Dropdown menu={{ items: localeOptions, onClick: changeLocales, selectedKeys: [locale] }}>
      <div>
        <ButtonIcon
          tooltipContent={tooltipContent}
          tooltipPlacement="left"
          icon="heroicons:language"
        ></ButtonIcon>
      </div>
    </Dropdown>
  );
});

export default LangSwitch;
