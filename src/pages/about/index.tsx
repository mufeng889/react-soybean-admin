import { Card, Descriptions, Space, Tag } from 'antd';
import pkg from '~/package.json';

interface PkgVersionInfo {
  name: string;
  version: string;
}

interface PkgJson {
  name: string;
  version: string;
  dependencies: PkgVersionInfo[];
  devDependencies: PkgVersionInfo[];
}

const latestBuildTime = BUILD_TIME;

const { name, version, dependencies, devDependencies } = pkg;

function transformVersionData(tuple: [string, string]): PkgVersionInfo {
  const [$name, $version] = tuple;
  return {
    name: $name,
    version: $version
  };
}

const pkgJson: PkgJson = {
  name,
  version,
  dependencies: Object.entries(dependencies).map(item => transformVersionData(item)),
  devDependencies: Object.entries(devDependencies).map(item => transformVersionData(item))
};

export function Component() {
  const { t } = useTranslation();
  return (
    <Space
      direction="vertical"
      size={16}
    >
      <Card
        title={t('page.about.title')}
        bordered={false}
        size="small"
        className="card-wrapper"
      >
        <p>{t('page.about.introduction')}</p>
      </Card>

      <Card
        title={t('page.about.projectInfo.title')}
        bordered={false}
        size="small"
        className="card-wrapper"
      >
        <Descriptions
          bordered
          size="small"
          column={{ xs: 1, sm: 2, xxl: 2, xl: 2, lg: 2, md: 2 }}
        >
          <Descriptions.Item label={t('page.about.projectInfo.version')}>
            <Tag color="blue">{pkgJson.version}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t('page.about.projectInfo.latestBuildTime')}>
            <Tag color="blue">{latestBuildTime}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label={t('page.about.projectInfo.githubLink')}>
            <a
              className="text-primary"
              href={pkg.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('page.about.projectInfo.githubLink')}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label={t('page.about.projectInfo.previewLink')}>
            <a
              className="text-primary"
              href={pkg.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('page.about.projectInfo.previewLink')}
            </a>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title={t('page.about.prdDep')}
        bordered={false}
        size="small"
        className="card-wrapper"
      >
        <Descriptions
          bordered
          size="small"
          column={{ xs: 1, sm: 2, xxl: 2, xl: 2, lg: 2, md: 2 }}
        >
          {pkgJson.dependencies.map(item => (
            <Descriptions.Item
              key={item.name}
              label={item.name}
            >
              {item.version}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>

      <Card
        title={t('page.about.devDep')}
        bordered={false}
        size="small"
        className="card-wrapper"
      >
        <Descriptions
          bordered
          size="small"
          column={{ xs: 1, sm: 2, xxl: 2, xl: 2, lg: 2, md: 2 }}
        >
          {pkgJson.devDependencies.map(item => (
            <Descriptions.Item
              key={item.name}
              label={item.name}
            >
              {item.version}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
    </Space>
  );
}
