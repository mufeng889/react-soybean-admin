const GlobalSearch = memo(() => {
  const { t } = useTranslation();

  return <ButtonIcon tooltipContent={t('common.search')}>
    <IconUilSearch />
  </ButtonIcon>;
});

export default GlobalSearch;
