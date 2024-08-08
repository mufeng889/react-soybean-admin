import { Col, Row, Space } from 'antd';
import HeaderBanner from './modules/HeaderBanner';
import CardData from './modules/CardData';
import LineChart from './modules/LineChart';
import PieChart from './modules/PieChart';
import ProjectNews from './modules/ProjectNews';
import CreativityBanner from './modules/CreativityBanner';

export function Component() {
  return (
    <Space
      direction="vertical"
      size={[16, 16]}
      className="w-full"
    >
      <HeaderBanner />
      <CardData />

      <Row gutter={[16, 16]}>
        <Col
          span={24}
          lg={14}
        >
          <LineChart />
        </Col>
        <Col
          span={24}
          lg={10}
        >
          <PieChart />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col
          span={24}
          lg={14}
        >
          <ProjectNews />
        </Col>
        <Col
          span={24}
          lg={10}
        >
          <CreativityBanner />
        </Col>
      </Row>
    </Space>
  );
}
