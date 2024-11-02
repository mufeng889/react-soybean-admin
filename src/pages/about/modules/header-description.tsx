import type { CardInfo } from './shared';

const HeaderDescription = (item: CardInfo) => {
  return (
    <ACard
      title={item.title}
      key={item.title}
      bordered={false}
      size="small"
      className="card-wrapper"
    >
      <ADescriptions
        bordered
        size="small"
        column={{ xs: 1, sm: 2, xxl: 2, xl: 2, lg: 2, md: 2 }}
      >
        {item.content.map(pkgInfo => (
          <ADescriptions.Item
            key={pkgInfo.label}
            label={pkgInfo.label}
          >
            {pkgInfo.render ? pkgInfo.render(pkgInfo) : pkgInfo.nameOrHref}
          </ADescriptions.Item>
        ))}
      </ADescriptions>
    </ACard>
  );
};

export default HeaderDescription;
