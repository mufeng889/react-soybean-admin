const GlobalSearch = memo(() => {
  const { t } = useTranslation();

  return (
    <ButtonIcon
      className="px-12px"
      tooltipContent={t('common.search')}
    >
      <IconUilSearch />
    </ButtonIcon>
  );
});

export default GlobalSearch;
