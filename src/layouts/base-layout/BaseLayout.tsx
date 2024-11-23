import { AdminLayout, LAYOUT_SCROLL_EL_ID } from '@sa/materials';
import type { LayoutMode } from '@sa/materials';
import { configResponsive } from 'ahooks';
import './index.scss';
import { Suspense } from 'react';

import {
  getContentXScrollable,
  getFullContent,
  getMixSiderFixed,
  getSiderCollapse,
  setIsMobile,
  setSiderCollapse
} from '@/store/slice/app';
import { getThemeSettings, setLayoutMode } from '@/store/slice/theme';

import GlobalContent from '../modules/global-content';
import GlobalFooter from '../modules/global-footer';
import GlobalHeader from '../modules/global-header';
import GlobalMenu from '../modules/global-menu';
import GlobalSider from '../modules/global-sider';
import GlobalTab from '../modules/global-tab';

const ThemeDrawer = lazy(() => import('../modules/theme-drawer'));

const LAYOUT_MODE_VERTICAL: LayoutMode = 'vertical';
const LAYOUT_MODE_HORIZONTAL: LayoutMode = 'horizontal';
const LAYOUT_MODE_VERTICAL_MIX = 'vertical-mix';
const LAYOUT_MODE_HORIZONTAL_MIX = 'horizontal-mix';

configResponsive({ sm: 640 });

const BaseLayout = () => {
  const siderCollapse = useAppSelector(getSiderCollapse);
  const themeSettings = useAppSelector(getThemeSettings);
  const fullContent = useAppSelector(getFullContent);
  const dispatch = useAppDispatch();
  const responsive = useResponsive();
  const { childLevelMenus, isActiveFirstLevelMenuHasChildren } = useMixMenuContext();

  const contentXScrollable = useAppSelector(getContentXScrollable);
  const mixSiderFixed = useAppSelector(getMixSiderFixed);

  const layoutMode = themeSettings.layout.mode.includes(LAYOUT_MODE_VERTICAL)
    ? LAYOUT_MODE_VERTICAL
    : LAYOUT_MODE_HORIZONTAL;

  const isMobile = !responsive.sm;

  const siderVisible = themeSettings.layout.mode !== LAYOUT_MODE_HORIZONTAL;

  const isVerticalMix = themeSettings.layout.mode === LAYOUT_MODE_VERTICAL_MIX;

  const isHorizontalMix = themeSettings.layout.mode === LAYOUT_MODE_HORIZONTAL_MIX;

  function getSiderWidth() {
    const { reverseHorizontalMix } = themeSettings.layout;

    const { mixChildMenuWidth, mixWidth, width } = themeSettings.sider;

    if (isHorizontalMix && reverseHorizontalMix) {
      return isActiveFirstLevelMenuHasChildren ? width : 0;
    }

    let w = isVerticalMix || isHorizontalMix ? mixWidth : width;

    if (isVerticalMix && mixSiderFixed && childLevelMenus.length) {
      w += mixChildMenuWidth;
    }

    return w;
  }

  function getSiderCollapsedWidth() {
    const { reverseHorizontalMix } = themeSettings.layout;
    const { collapsedWidth, mixChildMenuWidth, mixCollapsedWidth } = themeSettings.sider;

    if (isHorizontalMix && reverseHorizontalMix) {
      return isActiveFirstLevelMenuHasChildren ? collapsedWidth : 0;
    }

    let w = isVerticalMix || isHorizontalMix ? mixCollapsedWidth : collapsedWidth;

    if (isVerticalMix && mixSiderFixed && childLevelMenus.length) {
      w += mixChildMenuWidth;
    }

    return w;
  }
  const siderWidth = getSiderWidth();
  const siderCollapsedWidth = getSiderCollapsedWidth();

  useLayoutEffect(() => {
    dispatch(setIsMobile(isMobile));
    if (isMobile) {
      dispatch(setLayoutMode('vertical'));
    }
  }, [isMobile, dispatch]);

  return (
    <AdminLayout
      contentClass={contentXScrollable ? 'overflow-x-hidden' : ''}
      fixedFooter={themeSettings.footer.fixed}
      fixedTop={themeSettings.fixedHeaderAndTab}
      Footer={<GlobalFooter />}
      footerHeight={themeSettings.footer.height}
      footerVisible={themeSettings.footer.visible}
      fullContent={fullContent}
      headerHeight={themeSettings.header.height}
      isMobile={isMobile}
      mode={layoutMode}
      rightFooter={themeSettings.footer.right}
      scrollElId={LAYOUT_SCROLL_EL_ID}
      scrollMode={themeSettings.layout.scrollMode}
      siderCollapse={siderCollapse}
      siderCollapsedWidth={siderCollapsedWidth}
      siderVisible={siderVisible}
      siderWidth={siderWidth}
      Tab={<GlobalTab />}
      tabHeight={themeSettings.tab.height}
      tabVisible={themeSettings.tab.visible}
      updateSiderCollapse={() => dispatch(setSiderCollapse(true))}
      Header={
        <GlobalHeader
          isMobile={isMobile}
          mode={themeSettings.layout.mode}
          reverse={themeSettings.layout.reverseHorizontalMix}
          siderWidth={themeSettings.sider.width}
        />
      }
      Sider={
        <GlobalSider
          headerHeight={themeSettings.header.height}
          inverted={themeSettings.sider.inverted}
          isHorizontalMix={isHorizontalMix}
          isVerticalMix={isVerticalMix}
          siderCollapse={siderCollapse}
        />
      }
    >
      <GlobalContent />

      <GlobalMenu
        mode={themeSettings.layout.mode}
        reverse={themeSettings.layout.reverseHorizontalMix}
      />
      <Suspense fallback={null}>
        <ThemeDrawer />
      </Suspense>
    </AdminLayout>
  );
};

export default BaseLayout;
