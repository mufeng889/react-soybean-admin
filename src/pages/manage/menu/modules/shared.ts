import type { TFunction } from 'i18next';

const LAYOUT_PREFIX = 'layout.';
const VIEW_PREFIX = 'view.';
const FIRST_LEVEL_ROUTE_COMPONENT_SPLIT = '$';

export const layoutOptions: CommonType.Option[] = [
  {
    label: 'base',
    value: 'base'
  },
  {
    label: 'blank',
    value: 'blank'
  }
];

export function getPageOptions(routeName: string, allPages: string[]) {
  if (routeName && !allPages.includes(routeName)) {
    allPages.unshift(routeName);
  }

  const opts: CommonType.Option[] = allPages.map(page => ({
    label: page,
    value: page
  }));

  return opts;
}

export function createDefaultModel(): Model {
  return {
    activeMenu: null,
    buttons: [],
    component: '',
    constant: false,
    fixedIndexInTab: null,
    hideInMenu: false,
    href: null,
    i18nKey: null,
    icon: '',
    iconType: '1',
    keepAlive: false,
    layout: 'base',
    menuName: '',
    menuType: '1',
    multiTab: false,
    order: 0,
    page: '',
    parentId: 0,
    pathParam: '',
    query: [],
    routeName: '',
    routePath: '',
    status: '1'
  };
}

export function getLayoutAndPage(component?: string | null) {
  let layout = '';
  let page = '';

  const [layoutOrPage = '', pageItem = ''] = component?.split(FIRST_LEVEL_ROUTE_COMPONENT_SPLIT) || [];

  layout = getLayout(layoutOrPage);
  page = getPage(pageItem || layoutOrPage);

  return { layout, page };
}

function getLayout(layout: string) {
  return layout.startsWith(LAYOUT_PREFIX) ? layout.replace(LAYOUT_PREFIX, '') : '';
}

function getPage(page: string) {
  return page.startsWith(VIEW_PREFIX) ? page.replace(VIEW_PREFIX, '') : '';
}

/**
 * Get path param from route path
 *
 * @param routePath route path
 */
export function getPathParamFromRoutePath(routePath: string) {
  const [path, param = ''] = routePath.split('/:');

  return {
    param,
    path
  };
}

export function flattenMenu(menuList: Api.SystemManage.Menu[], t: TFunction<'translation', undefined>) {
  const result: CommonType.Option<number>[] = [];

  function flatten(item: Api.SystemManage.Menu) {
    const label = item.i18nKey ? t(item.i18nKey) : item.menuName;

    result.push({ label, value: item.id }); // 将当前元素加入结果数组，并移除 children 属性

    if (item.children && Array.isArray(item.children)) item.children.forEach(flatten); // 递归处理 children
  }

  menuList.forEach(flatten); // 对初始数组中的每一个元素进行展开

  return result;
}

export type Model = Pick<
  Api.SystemManage.Menu,
  | 'activeMenu'
  | 'component'
  | 'constant'
  | 'fixedIndexInTab'
  | 'hideInMenu'
  | 'href'
  | 'i18nKey'
  | 'icon'
  | 'iconType'
  | 'keepAlive'
  | 'menuName'
  | 'menuType'
  | 'multiTab'
  | 'order'
  | 'parentId'
  | 'routeName'
  | 'routePath'
  | 'status'
> & {
  buttons: NonNullable<Api.SystemManage.Menu['buttons']>;
  layout: string;
  page: string;
  pathParam: string;
  query: NonNullable<Api.SystemManage.Menu['query']>;
};

export type OperateType = AntDesign.TableOperateType | 'addChild';

export type Props = Omit<Page.OperateDrawerProps, ' operateType'> & {
  allPages: string[];
  menuList: CommonType.Option<number>[];
  operateType: OperateType;
};

export type RuleKey = Extract<keyof Model, 'menuName' | 'routeName' | 'routePath' | 'status'>;
