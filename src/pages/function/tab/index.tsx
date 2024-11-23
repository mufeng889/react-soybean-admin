import { Button, Card, Divider, Input, Space } from 'antd';

import { router } from '@/router';
import { removeActiveTab, removeTabByRouteName, resetTabLabel, setTabLabel } from '@/store/slice/tab';

const { Search } = Input;
export function Component() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  function changeTabLabel(value: string) {
    dispatch(setTabLabel(value));
  }

  return (
    <Space
      className="w-full"
      direction="vertical"
      size={16}
    >
      <Card
        bordered={false}
        className='"card-wrapper'
        size="small"
        title={t('page.function.tab.tabOperate.title')}
      >
        <Divider orientation="left">{t('page.function.tab.tabOperate.addTab')}</Divider>
        <Button
          onClick={() => {
            router.push({ name: 'about' });
          }}
        >
          {t('page.function.tab.tabOperate.addTabDesc')}
        </Button>

        <Divider orientation="left">{t('page.function.tab.tabOperate.closeTab')}</Divider>
        <Space size={16}>
          <Button
            onClick={() => {
              dispatch(removeActiveTab());
            }}
          >
            {t('page.function.tab.tabOperate.closeCurrentTab')}
          </Button>

          <Button
            onClick={() => {
              dispatch(removeTabByRouteName('about'));
            }}
          >
            {t('page.function.tab.tabOperate.closeAboutTab')}
          </Button>
        </Space>

        <Divider orientation="left">{t('page.function.tab.tabOperate.addMultiTab')}</Divider>
        <Space
          wrap
          className="m-0!"
          size={16}
        >
          <Button
            onClick={() => {
              router.push({ name: 'function_multi-tab' });
            }}
          >
            {t('page.function.tab.tabOperate.addMultiTabDesc1')}
          </Button>

          <Button
            onClick={() => {
              router.push({ name: 'function_multi-tab', query: { a: '1' } });
            }}
          >
            {t('page.function.tab.tabOperate.addMultiTabDesc2')}
          </Button>
        </Space>
      </Card>

      <Card
        bordered={false}
        className='"card-wrapper'
        size="small"
        title={t('page.function.tab.tabTitle.title')}
      >
        <Divider orientation="left">{t('page.function.tab.tabTitle.changeTitle')}</Divider>

        <Search
          allowClear
          className="max-w-240px"
          enterButton={t('page.function.tab.tabTitle.change')}
          onSearch={changeTabLabel}
        />

        <Divider orientation="left">{t('page.function.tab.tabTitle.resetTitle')}</Divider>
        <Button
          onClick={() => {
            dispatch(resetTabLabel());
          }}
        >
          {t('page.function.tab.tabTitle.reset')}
        </Button>
      </Card>
    </Space>
  );
}
