import { selectUserInfo } from '@/store/slice/auth';
import avatar from '@/assets/imgs/soybean.jpg';

interface StatisticData {
  id: number;
  title: string;
  value: string;
}

const HeaderBanner = () => {
  const { t } = useTranslation();

  const userInfo = useAppSelector(selectUserInfo);

  const statisticData: StatisticData[] = [
    {
      id: 0,
      title: t('page.home.projectCount'),
      value: '25'
    },
    {
      id: 1,
      title: t('page.home.todo'),
      value: '4/16'
    },
    {
      id: 2,
      title: t('page.home.message'),
      value: '12'
    }
  ];
  return (
    <ACard
      bordered={false}
      className="card-wrapper"
    >
      <ARow gutter={[16, 16]}>
        <ACol
          span={24}
          md={18}
        >
          <div className="flex-y-center">
            <div className="size-72px shrink-0 overflow-hidden rd-1/2">
              <img
                src={avatar}
                className="size-full"
              />
            </div>
            <div className="pl-12px">
              <h3 className="text-18px font-semibold">{t('page.home.greeting', { userName: userInfo.userName })}</h3>
              <p className="text-#999 leading-30px">{t('page.home.weatherDesc')}</p>
            </div>
          </div>
        </ACol>

        <ACol
          span={24}
          md={6}
        >
          <ASpace
            className="w-full justify-end"
            size={24}
          >
            {statisticData.map(item => (
              <AStatistic
                key={item.id}
                className="whitespace-nowrap"
                {...item}
              />
            ))}
          </ASpace>
        </ACol>
      </ARow>
    </ACard>
  );
};

export default HeaderBanner;
