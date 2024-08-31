import SystemLogo from '@/components/stateless/common/SystemLogo';
import ThemeSchemaSwitch from '@/components/stateful/ThemeSchemaSwitch';
import LangSwitch from '@/components/stateful/LangSwitch';

const Header = memo(() => {
  const { t } = useTranslation();

  return (
    <header className="flex-y-center justify-between">
      <SystemLogo className="text-64px text-primary lt-sm:text-48px" />
      <h3 className="text-28px text-primary font-500 lt-sm:text-22px">{t('system.title')}</h3>
      <div className="i-flex-col">
        <ThemeSchemaSwitch
          showTooltip={false}
          className="text-20px lt-sm:text-18px"
        />
        <LangSwitch showTooltip={false} />
      </div>
    </header>
  );
});

export default Header;
