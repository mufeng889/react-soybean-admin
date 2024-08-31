const CreativityBanner = memo(() => {
  const { t } = useTranslation();

  return (
    <ACard
      title={t('page.home.creativity')}
      bordered={false}
      size="small"
      className="h-full flex-col-stretch card-wrapper"
      styles={{ body: { flex: 1, overflow: 'hidden' } }}
    >
      <div className="h-full flex-center">
        <IconLocalBanner className="text-400px text-primary sm:text-320px" />
      </div>
    </ACard>
  );
});

export default CreativityBanner;
