import type { FC } from 'react';
import { Button, Popconfirm, Space } from 'antd';
import type { SpaceProps } from 'antd';
import React from 'react';
import classNames from 'classnames';
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
            icon={<IconIcRoundPlus className="text-icon" />}
            size="small"
            ghost
            type="primary"
            onClick={add}
          >
            {t('common.add')}
          </Button>
          <Popconfirm
            title={t('common.confirmDelete')}
            onConfirm={onDelete}
          >
            <Button
              icon={<IconIcRoundDelete className="text-icon" />}
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
        icon={<IconMdiRefresh className={classNames('text-icon', { 'animate-spin': loading })} />}
        size="small"
        onClick={refresh}
      >
        {t('common.refresh')}
      </Button>

      <APopover
        placement="bottomRight"
        trigger="click"
        content={
          <DragContent
            setColumnChecks={setColumnChecks}
            columns={columns}
          />
        }
      >
        <Button
          icon={<IconAntDesignSettingOutlined />}
          size="small"
        >
          {t('common.columnSetting')}
        </Button>
      </APopover>

      {suffix}
    </Space>
  );
};

export default TableHeaderOperation;
