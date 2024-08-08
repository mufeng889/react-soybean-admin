import ButtonIcon from '../custom/button-icon';

interface Props {
  full?: boolean;
  toggleFullscreen: () => void;
}

const FullScreen: FC<Props> = memo(({ full, toggleFullscreen }) => {
  const { t } = useTranslation();

  return (
    <ButtonIcon
      key={String(full)}
      tooltipContent={full ? t('icon.fullscreenExit') : t('icon.fullscreen')}
      onClick={toggleFullscreen}
    >
      {full ? IconGridiconsFullscreenExit({}) : IconGridiconsFullscreen({})}
    </ButtonIcon>
  );
});

export default FullScreen;
