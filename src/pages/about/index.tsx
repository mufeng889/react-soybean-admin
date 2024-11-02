import TypeIt from 'typeit';
import type { Options } from 'typeit';
import type { El } from 'typeit/dist/types';
import pkg from '~/package.json';
import type { CardInfo, PkgJson, PkgVersionInfo } from './modules/shared';
import { transformVersionData } from './modules/shared';
import HeaderDescription from './modules/header-description';

const latestBuildTime = BUILD_TIME;

const { name, version, dependencies, devDependencies } = pkg;

const pkgJson: PkgJson = {
  name,
  version,
  dependencies: Object.entries(dependencies).map(transformVersionData),
  devDependencies: Object.entries(devDependencies).map(transformVersionData)
};

const TagItem = (item: PkgVersionInfo) => <ATag color="blue">{item.nameOrHref}</ATag>;

const Link = (item: PkgVersionInfo) => (
  <a
    className="text-primary"
    href={item.nameOrHref}
    target="_blank"
    rel="noopener noreferrer"
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
      strings: t('page.about.introduction'),
      lifeLike: true,
      speed: 10
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
      title: t('page.about.projectInfo.title'),
      content: packageInfo
    },
    {
      title: t('page.about.prdDep'),
      content: pkgJson.dependencies
    },
    {
      title: t('page.about.devDep'),
      content: pkgJson.dependencies
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
      direction="vertical"
      className="w-full"
      size={16}
    >
      <ACard
        title={t('page.about.title')}
        bordered={false}
        size="small"
        className="card-wrapper"
      >
        <span ref={textRef} />
      </ACard>

      {cardInfo.map(HeaderDescription)}
    </ASpace>
  );
}
