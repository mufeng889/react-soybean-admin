import { Button, Popconfirm, Space } from 'antd';
import type { SpaceProps } from 'antd';
import classNames from 'classnames';
import React from 'react';
import type { FC } from 'react';

import DragContent from './DragContent';

interface Props {
  readonly add: () => void;
  readonly children?: React.ReactNode;
  readonly columns: AntDesign.TableColumnCheck[];
  readonly disabledDelete?: boolean;
  readonly itemAlign?: SpaceProps['align'];
  readonly loading?: boolean;
  readonly onDelete: () => void;
  readonly prefix?: React.ReactNode;
  readonly refresh: () => void;
  readonly setColumnChecks: (checks: AntDesign.TableColumnCheck[]) => void;
  readonly suffix?: React.ReactNode;
}

const TableHeaderOperation: FC<Props> = ({
  add,
  children,
  columns,
  disabledDelete,
  itemAlign,
  loading,
  onDelete,
  prefix,
  refresh,
  setColumnChecks,
  suffix
}) => {
  const { t } = useTranslation();

  return (
    <Space
      wrap
      align={itemAlign}
      className="lt-sm:w-200px"
    >
      {prefix}
      {children || (
        <>
          <Button
            ghost
            icon={<IconIcRoundPlus className="text-icon" />}
            size="small"
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
              danger
              ghost
              disabled={disabledDelete}
              icon={<IconIcRoundDelete className="text-icon" />}
              size="small"
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
            columns={columns}
            setColumnChecks={setColumnChecks}
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
