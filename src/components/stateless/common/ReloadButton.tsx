import ButtonIcon from '../custom/ButtonIcon';

interface Props {
  loading?: boolean;
  handClick?: () => void;
}
const ReloadButton: FC<Props> = memo(({ loading, handClick }) => {
  const { t } = useTranslation();

  return (
    <ButtonIcon
      onClick={handClick}
      tooltipContent={t('icon.reload')}
    >
      <IconAntDesignReloadOutlined className={loading ? 'animate-spin animate-duration-750' : ''} />
    </ButtonIcon>
  );
});

export default ReloadButton;
