import { Card, List } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useArray } from '@sa/hooks';
import SoybeanAvatar from '@/components/stateful/SoybeanAvatar';

const variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 200, transition: { duration: 0.3 } }
};

const ProjectNews = () => {
  const { t } = useTranslation();

  const [newses, { push, remove, unshift, up, down, pop, shift, reverse, sort }] = useArray([
    { id: 1, content: t('page.home.projectNews.desc1'), time: '2021-05-28 22:22:22' },
    { id: 2, content: t('page.home.projectNews.desc2'), time: '2023-10-27 10:24:54' },
    { id: 3, content: t('page.home.projectNews.desc3'), time: '2021-10-31 22:43:12' },
    { id: 4, content: t('page.home.projectNews.desc4'), time: '2022-11-03 20:33:31' },
    { id: 5, content: t('page.home.projectNews.desc5'), time: '2021-11-07 22:45:32' }
  ]);

  const sortByTimeDesc = () => {
    sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  };

  return (
    <Card
      extra={[
        <AButton
          onClick={reverse}
          type="text"
          key="reverse"
        >
          反转
        </AButton>,
        <AButton
          onClick={sortByTimeDesc}
          type="text"
          key="reverse"
        >
          以时间排序
        </AButton>,
        <AButton
          onClick={() => unshift({ id: 1, content: '我是第一个', time: '2021-11-07 22:45:32' })}
          type="text"
          key="unshift"
        >
          从头添加
        </AButton>,
        <AButton
          onClick={shift}
          type="text"
          key="shift"
        >
          删除头部
        </AButton>,
        <AButton
          onClick={() => push({ id: 6, content: '我是第六个', time: '2021-11-07 22:45:32' })}
          type="text"
          key="PUSH"
        >
          尾部添加
        </AButton>,
        <AButton
          onClick={pop}
          type="text"
          key="pop"
        >
          删除尾部
        </AButton>,
        <a
          key="a"
          className="ml-8px text-primary"
        >
          {t('page.home.projectNews.moreNews')}
        </a>
      ]}
      bordered={false}
      size="small"
      className="card-wrapper"
      title={t('page.home.projectNews.title')}
    >
      <AnimatePresence mode="popLayout">
        <List
          dataSource={newses}
          renderItem={item => (
            <motion.div
              key={item.id}
              variants={variants} // 应用定义的动画 variants
              initial="hidden" // 初始状态
              animate="visible" // 动画目标状态
              exit="exit" // 退出时动画
              layout // 处理上移、下移等排序动画
            >
              <List.Item
                actions={[
                  <AButton
                    onClick={() => up(item.id)}
                    size="small"
                    key="up"
                  >
                    上移
                  </AButton>,

                  <AButton
                    onClick={() => remove(item.id)}
                    danger
                    size="small"
                    key="del"
                  >
                    删除
                  </AButton>,
                  <AButton
                    onClick={() => down(item.id)}
                    size="small"
                    key="down"
                  >
                    下移
                  </AButton>
                ]}
              >
                <List.Item.Meta
                  avatar={<SoybeanAvatar className="size-48px!" />}
                  title={item.content}
                  description={item.time}
                ></List.Item.Meta>
              </List.Item>
            </motion.div>
          )}
        ></List>
      </AnimatePresence>
    </Card>
  );
};

export default ProjectNews;
