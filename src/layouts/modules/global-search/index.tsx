import ButtonIcon from '@/components/custom/button-icon';

const GlobalSearch = memo(() => {
  const { t } = useTranslation();
  return <ButtonIcon tooltipContent={t('common.search')}>{IconUilSearch({})}</ButtonIcon>;
});

export default GlobalSearch;
