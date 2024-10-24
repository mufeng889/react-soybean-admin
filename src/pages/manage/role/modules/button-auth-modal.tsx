import type { DataNode } from 'antd/es/tree';
import type { ModulesProps } from './type';

const ButtonAuthModal: FC<ModulesProps> = memo(({ open, onClose, roleId }) => {
  const { t } = useTranslation();

  const title = t('common.edit') + t('page.manage.role.buttonAuth');

  const [checks, setChecks] = useState<number[]>();

  const [tree, setTree] = useState<DataNode[]>();

  async function getChecks() {
    console.log(roleId);
    // request
    setChecks([1, 2, 3, 4, 5]);
  }

  async function getAllButtons() {
    // request
    setTree([
      { key: 1, title: 'button1' },
      { key: 2, title: 'button2' },
      { key: 3, title: 'button3' },
      { key: 4, title: 'button4' },
      { key: 5, title: 'button5' },
      { key: 6, title: 'button6' },
      { key: 7, title: 'button7' },
      { key: 8, title: 'button8' },
      { key: 9, title: 'button9' },
      { key: 10, title: 'button10' }
    ]);
  }

  function handleSubmit() {
    console.log(checks, roleId);
    // request

    window.$message?.success?.(t('common.modifySuccess'));

    onClose();
  }

  function init() {
    getAllButtons();
    getChecks();
  }

  useMount(() => {
    init();
  });

  return (
    <AModal
      open={open}
      className="w-480px"
      onCancel={onClose}
      title={title}
      footer={
        <ASpace className="mt-16px">
          <AButton
            size="small"
            onClick={onClose}
          >
            {t('common.cancel')}
          </AButton>
          <AButton
            size="small"
            onClick={handleSubmit}
            type="primary"
          >
            {t('common.confirm')}
          </AButton>
        </ASpace>
      }
    >
      <ATree
        treeData={tree}
        checkedKeys={checks}
        onCheck={value => setChecks(value as number[])}
        checkable
        className="h-280px"
        height={280}
      />
    </AModal>
  );
});

export default ButtonAuthModal;
