import CountUp from 'react-countup';

interface CardDataProps {
  key: string;
  title: string;
  value: number;
  unit: string;
  color: {
    start: string;
    end: string;
  };
  icon: string;
}

function getGradientColor(color: CardDataProps['color']) {
  return `linear-gradient(to bottom right, ${color.start}, ${color.end})`;
}

function useGetCardData() {
  const { t } = useTranslation();

  const cardData: CardDataProps[] = [
    {
      key: 'visitCount',
      title: t('page.home.visitCount'),
      value: 9725,
      unit: '',
      color: {
        start: '#ec4786',
        end: '#b955a4'
      },
      icon: 'ant-design:bar-chart-outlined'
    },
    {
      key: 'turnover',
      title: t('page.home.turnover'),
      value: 1026,
      unit: '$',
      color: {
        start: '#865ec0',
        end: '#5144b4'
      },
      icon: 'ant-design:money-collect-outlined'
    },
    {
      key: 'downloadCount',
      title: t('page.home.downloadCount'),
      value: 970925,
      unit: '',
      color: {
        start: '#56cdf3',
        end: '#719de3'
      },
      icon: 'carbon:document-download'
    },
    {
      key: 'dealCount',
      title: t('page.home.dealCount'),
      value: 9527,
      unit: '',
      color: {
        start: '#fcbc25',
        end: '#f68057'
      },
      icon: 'ant-design:trademark-circle-outlined'
    }
  ];

  return cardData;
}

const CardItem = (data: CardDataProps) => {
  return (
    <ACol
      key={data.key}
      span={24}
      md={12}
      lg={6}
    >
      <div
        className="flex-1 rd-8px px-16px pb-4px pt-8px text-white"
        style={{ backgroundImage: getGradientColor(data.color) }}
      >
        <h3 className="text-16px">{data.title}</h3>
        <div className="flex justify-between pt-12px">
          <SvgIcon
            icon={data.icon}
            className="text-32px"
          />
          <CountUp
            prefix={data.unit}
            start={1}
            end={data.value}
            duration={1.5}
            className="text-30px text-white dark:text-dark"
          />
        </div>
      </div>
    </ACol>
  );
};

const CardData = memo(() => {
  const data = useGetCardData();

  return (
    <ACard
      bordered={false}
      size="small"
      className="card-wrapper"
    >
      <ARow gutter={[16, 16]}>{data.map(CardItem)}</ARow>
    </ACard>
  );
});

export default CardData;
