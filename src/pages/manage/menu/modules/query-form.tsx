import type { FormListFieldData, FormListOperation } from 'antd';

type Props = {
  readonly add: FormListOperation['add'];
  readonly index: number;
  readonly item: FormListFieldData;
  readonly remove: FormListOperation['remove'];
};

export const QueryForm = ({ add, index, item, remove }: Props) => {
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
            className="flex-1"
            placeholder={t('page.manage.menu.form.queryKey')}
          />
        </AForm.Item>
      </ACol>

      <ACol span={9}>
        <AForm.Item name={[item.name, 'value']}>
          <AInput
            className="flex-1"
            placeholder={t('page.manage.menu.form.queryValue')}
          />
        </AForm.Item>
      </ACol>

      <ACol span={5}>
        <ASpace className="ml-12px">
          <AButton
            icon={<IconIcRoundPlus className="align-sub text-icon" />}
            size="middle"
            onClick={handleAdd}
          />
          <AButton
            icon={<IconIcRoundRemove className="align-sub text-icon" />}
            size="middle"
            onClick={handleRemove}
          />
        </ASpace>
      </ACol>
    </div>
  );
};
