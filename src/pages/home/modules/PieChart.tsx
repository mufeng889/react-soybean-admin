import { Card } from 'antd';
import { getLocale } from '@/store/slice/app';

const PieChart = memo(() => {
  const { t } = useTranslation();
  const locale = useAppSelector(getLocale);

  const { domRef, updateOptions } = useEcharts(() => ({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '1%',
      left: 'center',
      itemStyle: {
        borderWidth: 0
      }
    },
    series: [
      {
        color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca'],
        name: t('page.home.schedule'),
        type: 'pie',
        radius: ['45%', '75%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12'
          }
        },
        labelLine: {
          show: false
        },
        data: [] as { name: string; value: number }[]
      }
    ]
  }));

  async function mockData() {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    updateOptions(opts => {
      opts.series[0].data = [
        { name: t('page.home.study'), value: 20 },
        { name: t('page.home.entertainment'), value: 10 },
        { name: t('page.home.work'), value: 40 },
        { name: t('page.home.rest'), value: 30 }
      ];

      return opts;
    });
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();

      opts.series[0].name = originOpts.series[0].name;

      opts.series[0].data = [
        { name: t('page.home.study'), value: 20 },
        { name: t('page.home.entertainment'), value: 10 },
        { name: t('page.home.work'), value: 40 },
        { name: t('page.home.rest'), value: 30 }
      ];

      return opts;
    });
  }

  async function init() {
    mockData();
  }

  useMount(() => {
    init();
  });

  useUpdateEffect(() => {
    updateLocale();
  }, [locale]);
  return (
    <Card
      bordered={false}
      className="card-wrapper"
    >
      <div
        ref={domRef}
        className="h-360px overflow-hidden"
      ></div>
    </Card>
  );
});

export default PieChart;
