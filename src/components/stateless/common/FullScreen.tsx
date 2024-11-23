import ButtonIcon from '../custom/ButtonIcon';

interface Props {
  className?: string;
  full?: boolean;
  toggleFullscreen: () => void;
}

const FullScreen: FC<Props> = memo(({ className, full, toggleFullscreen }) => {
  const { t } = useTranslation();

  return (
    <ButtonIcon
      className={className}
      key={String(full)}
      tooltipContent={full ? t('icon.fullscreenExit') : t('icon.fullscreen')}
      onClick={toggleFullscreen}
    >
      {full ? <IconGridiconsFullscreenExit /> : <IconGridiconsFullscreen />}
    </ButtonIcon>
  );
});

export default FullScreen;
