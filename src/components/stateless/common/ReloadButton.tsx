import ButtonIcon from '../custom/ButtonIcon';

interface Props {
  handClick?: () => void;
  loading?: boolean;
}
const ReloadButton: FC<Props> = memo(({ handClick, loading }) => {
  const { t } = useTranslation();

  return (
    <ButtonIcon
      tooltipContent={t('icon.reload')}
      onClick={handClick}
    >
      <IconAntDesignReloadOutlined className={loading ? 'animate-spin animate-duration-750' : ''} />
    </ButtonIcon>
  );
});

export default ReloadButton;
