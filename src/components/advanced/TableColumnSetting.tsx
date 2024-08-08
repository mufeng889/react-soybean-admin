import { Button, Popover } from 'antd';
import type { FC } from 'react';
import type { PopoverProps } from 'antd';

interface Props {
  content: PopoverProps['content'];
}

const TableColumnSetting: FC<Props> = memo(({ content }) => {
  const { t } = useTranslation();

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      content={content}
    >
      <Button
        icon={IconAntDesignSettingOutlined({})}
        size="small"
      >
        {t('common.columnSetting')}
      </Button>
    </Popover>
  );
});

export default TableColumnSetting;
