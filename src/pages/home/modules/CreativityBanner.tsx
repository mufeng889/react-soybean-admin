const CreativityBanner = memo(() => {
  const { t } = useTranslation();

  return (
    <ACard
      bordered={false}
      className="h-full flex-col-stretch card-wrapper"
      size="small"
      styles={{ body: { flex: 1, overflow: 'hidden' } }}
      title={t('page.home.creativity')}
    >
      <div className="h-full flex-center">
        <IconLocalBanner className="text-400px text-primary sm:text-320px" />
      </div>
    </ACard>
  );
});

export default CreativityBanner;
