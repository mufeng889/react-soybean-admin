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
            children: recursiveTransform(item.children),
            key,
            title: label
          };
        }

        return {
          key,
          title: label
        };
      })
    : [];
}

const MenuAuthModal: FC<ModulesProps> = memo(({ onClose, open, roleId }) => {
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
      className="w-480px"
      open={open}
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
            type="primary"
            onClick={handleSubmit}
          >
            {t('common.confirm')}
          </AButton>
        </ASpace>
      }
      onCancel={onClose}
    >
      <div className="flex-y-center gap-16px pb-12px">
        <div>{t('page.manage.menu.home')}</div>

        <ASelect
          className="w-240px"
          options={pageSelectOptions}
          value={home}
          onChange={setHome}
        />
      </div>
      <ATree
        checkable
        checkedKeys={checks}
        className="h-280px"
        height={280}
        treeData={recursiveTransform(tree)}
        onCheck={value => setChecks(value as number[])}
      />
    </AModal>
  );
});

export default MenuAuthModal;
