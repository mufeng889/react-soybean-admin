import type { FormListFieldData, FormListOperation } from 'antd';

type Props = {
  item: FormListFieldData;
  add: FormListOperation['add'];
  remove: FormListOperation['remove'];
  index: number;
};

export const QueryForm = ({ item, index, add, remove }: Props) => {
  const { t } = useTranslation();

  function handleRemove() {
    remove(index);
  }

  function handleAdd() {
    add('', index);
  }

  return (
    <div className="flex gap-3">
      <ACol span={9}>
        <AForm.Item name={[item.name, 'key']}>
          <AInput
            placeholder={t('page.manage.menu.form.queryKey')}
            className="flex-1"
          />
        </AForm.Item>
      </ACol>

      <ACol span={9}>
        <AForm.Item name={[item.name, 'value']}>
          <AInput
            placeholder={t('page.manage.menu.form.queryValue')}
            className="flex-1"
          />
        </AForm.Item>
      </ACol>

      <ACol span={5}>
        <ASpace className="ml-12px">
          <AButton
            size="middle"
            onClick={handleAdd}
            icon={<IconIcRoundPlus className="align-sub text-icon" />}
          ></AButton>
          <AButton
            size="middle"
            onClick={handleRemove}
            icon={<IconIcRoundRemove className="align-sub text-icon" />}
          ></AButton>
        </ASpace>
      </ACol>
    </div>
  );
};
