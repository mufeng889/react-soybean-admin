import TypeIt from 'typeit';
import type { Options } from 'typeit';
import type { El } from 'typeit/dist/types';

import pkg from '~/package.json';

import HeaderDescription from './modules/header-description';
import type { CardInfo, PkgJson, PkgVersionInfo } from './modules/shared';
import { transformVersionData } from './modules/shared';

const latestBuildTime = BUILD_TIME;

const { dependencies, devDependencies, name, version } = pkg;

const pkgJson: PkgJson = {
  dependencies: Object.entries(dependencies).map(transformVersionData),
  devDependencies: Object.entries(devDependencies).map(transformVersionData),
  name,
  version
};

const TagItem = (item: PkgVersionInfo) => <ATag color="blue">{item.nameOrHref}</ATag>;

const Link = (item: PkgVersionInfo) => (
  <a
    className="text-primary"
    href={item.nameOrHref}
    rel="noopener noreferrer"
    target="_blank"
  >
    {item.label}
  </a>
);

function useGetTypeit() {
  const textRef = useRef<El>(null);

  const { t } = useTranslation();

  function init() {
    if (!textRef.current) return;

    const options: Options = {
      lifeLike: true,
      speed: 10,
      strings: t('page.about.introduction')
    };

    const initTypeIt = new TypeIt(textRef.current, options);

    initTypeIt.go();
  }

  useMount(() => {
    init();
  });

  return textRef;
}

function useGetCardInfo(): CardInfo[] {
  const { t } = useTranslation();

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

  const cardInfo: CardInfo[] = [
    {
      content: packageInfo,
      title: t('page.about.projectInfo.title')
    },
    {
      content: pkgJson.dependencies,
      title: t('page.about.prdDep')
    },
    {
      content: pkgJson.dependencies,
      title: t('page.about.devDep')
    }
  ];
  return cardInfo;
}

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
