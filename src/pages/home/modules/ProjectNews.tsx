import { Card, List } from 'antd';
import SoybeanAvatar from '@/components/stateful/SoybeanAvatar';

interface NewsItem {
  id: number;
  content: string;
  time: string;
}

const ProjectNews = () => {
  const { t } = useTranslation();
  const newses: NewsItem[] = [
    { id: 1, content: t('page.home.projectNews.desc1'), time: '2021-05-28 22:22:22' },
    { id: 2, content: t('page.home.projectNews.desc2'), time: '2021-10-27 10:24:54' },
    { id: 3, content: t('page.home.projectNews.desc3'), time: '2021-10-31 22:43:12' },
    { id: 4, content: t('page.home.projectNews.desc4'), time: '2021-11-03 20:33:31' },
    { id: 5, content: t('page.home.projectNews.desc5'), time: '2021-11-07 22:45:32' }
  ];
  return (
    <Card
      extra={<a className="text-primary">{t('page.home.projectNews.moreNews')}</a>}
      bordered={false}
      size="small"
      className="card-wrapper"
      title={t('page.home.projectNews.title')}
    >
      <List
        dataSource={newses}
        renderItem={item => (
          <List.Item key={item.time}>
            <List.Item.Meta
              avatar={<SoybeanAvatar className="size-48px!" />}
              title={item.content}
              description={item.time}
            ></List.Item.Meta>
          </List.Item>
        )}
      ></List>
    </Card>
  );
};

export default ProjectNews;
