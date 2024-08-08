import type { FC } from 'react';
import { Button, Popconfirm, Space } from 'antd';
import type { SpaceProps } from 'antd';
import React from 'react';
import classNames from 'classnames';
import TableColumnSetting from './TableColumnSetting';
import DragContent from './DragContent';

interface Props {
  itemAlign?: SpaceProps['align'];
  disabledDelete?: boolean;
  loading?: boolean;
  prefix?: React.ReactNode;
  children?: React.ReactNode;
  suffix?: React.ReactNode;
  add: () => void;
  onDelete: () => void;
  refresh: () => void;
  setColumnChecks: (checks: AntDesign.TableColumnCheck[]) => void;
  columns: AntDesign.TableColumnCheck[];
}

const TableHeaderOperation: FC<Props> = ({
  itemAlign,
  disabledDelete,
  onDelete,
  add,
  refresh,
  prefix,
  children,
  loading,
  columns,
  suffix,
  setColumnChecks
}) => {
  const { t } = useTranslation();

  function handleAdd() {
    add();
  }

  function batchDelete() {
    onDelete();
  }

  function handleRefresh() {
    refresh();
  }
  return (
    <Space
      align={itemAlign}
      wrap
      className="lt-sm:w-200px"
    >
      {prefix}
      {children || (
        <>
          <Button
            icon={IconIcRoundPlus({ className: 'text-icon' })}
            size="small"
            ghost
            type="primary"
            onClick={handleAdd}
          >
            {t('common.add')}
          </Button>
          <Popconfirm
            title={t('common.confirmDelete')}
            onConfirm={batchDelete}
          >
            <Button
              icon={IconIcRoundDelete({ className: 'text-icon' })}
              size="small"
              ghost
              disabled={disabledDelete}
              danger
            >
              {t('common.batchDelete')}
            </Button>
          </Popconfirm>
        </>
      )}
      <Button
        icon={IconMdiRefresh({ className: classNames('text-icon', { 'animate-spin': loading }) })}
        size="small"
        onClick={handleRefresh}
      >
        {t('common.refresh')}
      </Button>
      <TableColumnSetting
        content={
          <DragContent
            setColumnChecks={setColumnChecks}
            columns={columns}
          />
        }
      />
      {suffix}
    </Space>
  );
};

export default TableHeaderOperation;
