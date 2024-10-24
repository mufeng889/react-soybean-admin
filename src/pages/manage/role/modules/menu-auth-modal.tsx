import { useRequest } from '@sa/hooks';
import type { DataNode } from 'antd/es/tree';
import { fetchGetAllPages, fetchGetMenuTree } from '@/service/api';
import type { ModulesProps } from './type';

function getOptions(item: string) {
  return {
    label: item,
    value: item
  };
}

function recursiveTransform(data: Api.SystemManage.MenuTree[] | null): DataNode[] {
  return data
    ? data.map(item => {
        const { id: key, label } = item;

        if (item.children) {
          return {
            key,
            title: label,
            children: recursiveTransform(item.children)
          };
        }

        return {
          key,
          title: label
        };
      })
    : [];
}

const MenuAuthModal: FC<ModulesProps> = memo(({ open, onClose, roleId }) => {
  const { t } = useTranslation();

  const title = t('common.edit') + t('page.manage.role.menuAuth');

  const [home, setHome] = useState<string>();

  const [checks, setChecks] = useState<number[]>();

  const { data, run } = useRequest(fetchGetAllPages, {
    manual: true
  });

  const { data: tree, run: getTree } = useRequest(fetchGetMenuTree, {
    manual: true
  });

  const pageSelectOptions = data ? data.map(getOptions) : [];

  async function getChecks() {
    console.log(roleId);
    // request
    setChecks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21]);
  }

  function handleSubmit() {
    console.log(checks, roleId);
    // request

    window.$message?.success?.(t('common.modifySuccess'));

    onClose();
  }

  async function init() {
    setHome('home');
    run();
    await getTree();
    await getChecks();
  }

  useUpdateEffect(() => {
    if (open) {
      init();
    }
  }, [open]);

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
      <div className="flex-y-center gap-16px pb-12px">
        <div>{t('page.manage.menu.home')}</div>

        <ASelect
          options={pageSelectOptions}
          onChange={setHome}
          value={home}
          className="w-240px"
        />
      </div>
      <ATree
        treeData={recursiveTransform(tree)}
        checkedKeys={checks}
        onCheck={value => setChecks(value as number[])}
        className="h-280px"
        checkable
        height={280}
      />
    </AModal>
  );
});

export default MenuAuthModal;
