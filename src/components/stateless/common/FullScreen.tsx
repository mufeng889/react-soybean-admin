import ButtonIcon from '../custom/ButtonIcon';

interface Props {
  full?: boolean;
  toggleFullscreen: () => void;
  className?: string;
}

const FullScreen: FC<Props> = memo(({ full, toggleFullscreen, className }) => {
  const { t } = useTranslation();

  return (
    <ButtonIcon
      key={String(full)}
      tooltipContent={full ? t('icon.fullscreenExit') : t('icon.fullscreen')}
      onClick={toggleFullscreen}
      className={className}
    >
      {full ? <IconGridiconsFullscreenExit /> : <IconGridiconsFullscreen />}
    </ButtonIcon>
  );
});

export default FullScreen;
