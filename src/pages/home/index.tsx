import HeaderBanner from './modules/HeaderBanner';
import CardData from './modules/CardData';
import LineChart from './modules/LineChart';
import PieChart from './modules/PieChart';
import ProjectNews from './modules/ProjectNews';
import CreativityBanner from './modules/CreativityBanner';

export function Component() {
  return (
    <ASpace
      direction="vertical"
      size={[16, 16]}
      className="w-full"
    >
      <HeaderBanner />
      <CardData />

      <ARow gutter={[16, 16]}>
        <ACol
          span={24}
          lg={14}
        >
          <LineChart />
        </ACol>
        <ACol
          span={24}
          lg={10}
        >
          <PieChart />
        </ACol>
      </ARow>

      <ARow gutter={[16, 16]}>
        <ACol
          span={24}
          lg={14}
        >
          <ProjectNews />
        </ACol>
        <ACol
          span={24}
          lg={10}
        >
          <CreativityBanner />
        </ACol>
      </ARow>
    </ASpace>
  );
}
