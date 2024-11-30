import TypeIt from 'typeit';
import type { El } from 'typeit/dist/types';

import pkg from '~/package.json';

import HeaderDescription from './modules/header-description';
import type { CardInfo, PkgJson, PkgVersionInfo } from './modules/shared';
import { transformVersionData } from './modules/shared';

const latestBuildTime = BUILD_TIME;

// 解构 package.json 数据
const { dependencies, devDependencies, name, version } = pkg;

// 格式化 package.json 数据
const pkgJson: PkgJson = {
  dependencies: Object.entries(dependencies).map(transformVersionData),
  devDependencies: Object.entries(devDependencies).map(transformVersionData),
  name,
  version
};

// 抽离渲染组件
const TagItem = ({ nameOrHref }: PkgVersionInfo) => <ATag color="blue">{nameOrHref}</ATag>;

const Link = ({ label, nameOrHref }: PkgVersionInfo) => (
  <a
    className="text-primary"
    href={nameOrHref}
    rel="noopener noreferrer"
    target="_blank"
  >
    {label}
  </a>
);

// 使用 TypeIt 的自定义 Hook
function useGetTypeit() {
  const textRef = useRef<El>(null);
  const { t } = useTranslation();

  useMount(() => {
    if (!textRef.current) return;

    const typeIt = new TypeIt(textRef.current, {
      lifeLike: true,
      speed: 10,
      strings: t('page.about.introduction')
    });

    typeIt.go();
  });

  return textRef;
}

// 获取卡片信息的自定义 Hook
function useGetCardInfo(): CardInfo[] {
  const { t } = useTranslation();

  // 项目基本信息
  const packageInfo: PkgVersionInfo[] = [
    {
      label: t('page.about.projectInfo.version'),
      nameOrHref: pkgJson.version,
      render: TagItem
    },
    {
      label: t('page.about.projectInfo.latestBuildTime'),
      nameOrHref: latestBuildTime,
      render: TagItem
    },
    {
      label: t('page.about.projectInfo.githubLink'),
      nameOrHref: pkg.homepage,
      render: Link
    },
    {
      label: t('page.about.projectInfo.previewLink'),
      nameOrHref: pkg.website,
      render: Link
    }
  ];

  // 卡片信息配置
  return [
    {
      content: packageInfo,
      title: t('page.about.projectInfo.title')
    },
    {
      content: pkgJson.dependencies,
      title: t('page.about.prdDep')
    },
    {
      content: pkgJson.devDependencies, // 修复之前使用错误的 dependencies
      title: t('page.about.devDep')
    }
  ];
}

// 主组件
export function Component() {
  const { t } = useTranslation();

  const cardInfo = useGetCardInfo();

  const textRef = useGetTypeit();

  return (
    <ASpace
      className="w-full"
      direction="vertical"
      size={16}
    >
      <ACard
        bordered={false}
        className="card-wrapper"
        size="small"
        title={t('page.about.title')}
      >
        <span ref={textRef} />
      </ACard>

      {cardInfo.map(HeaderDescription)}
    </ASpace>
  );
}
