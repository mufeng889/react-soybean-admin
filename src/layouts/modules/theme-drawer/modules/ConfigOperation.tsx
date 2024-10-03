import Clipboard from 'clipboard';
import { resetTheme, settingsJson } from '@/store/slice/theme';

const ConfigOperation = () => {
  const { t } = useTranslation();

  const domRef = useRef<HTMLDivElement | null>(null);

  const themeSettingsJson = useAppSelector(settingsJson);

  const dispatch = useAppDispatch();

  function getClipboardText() {
    const reg = /"\w+":/g;

    return themeSettingsJson.replace(reg, match => match.replace(/"/g, ''));
  }

  function initClipboard() {
    if (!domRef.current) return;

    const clipboard = new Clipboard(domRef.current, {
      text: () => getClipboardText()
    });

    clipboard.on('success', () => {
      window.$message?.success(t('theme.configOperation.copySuccessMsg'));
    });
  }

  function handleReset() {
    dispatch(resetTheme());

    setTimeout(() => {
      window.$message?.success(t('theme.configOperation.resetSuccessMsg'));
    }, 50);
  }

  useMount(() => {
    initClipboard();
  });

  return (
    <div className="flex justify-between">
      <AButton
        danger
        onClick={handleReset}
      >
        {t('theme.configOperation.resetConfig')}
      </AButton>
      <div ref={domRef}>
        <AButton type="primary">{t('theme.configOperation.copyConfig')}</AButton>
      </div>
    </div>
  );
};

export default ConfigOperation;
