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
import GlobalSider from '../modules/global-sider';
import GlobalTab from '../modules/global-tab';
import GlobalMenu from '../modules/global-menu';

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

    const { width, mixWidth, mixChildMenuWidth } = themeSettings.sider;

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
    const { collapsedWidth, mixCollapsedWidth, mixChildMenuWidth } = themeSettings.sider;

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
      siderCollapse={siderCollapse}
      updateSiderCollapse={() => dispatch(setSiderCollapse(true))}
      mode={layoutMode}
      scrollElId={LAYOUT_SCROLL_EL_ID}
      scrollMode={themeSettings.layout.scrollMode}
      isMobile={isMobile}
      fullContent={fullContent}
      fixedTop={themeSettings.fixedHeaderAndTab}
      headerHeight={themeSettings.header.height}
      tabVisible={themeSettings.tab.visible}
      tabHeight={themeSettings.tab.height}
      contentClass={contentXScrollable ? 'overflow-x-hidden' : ''}
      siderVisible={siderVisible}
      siderWidth={siderWidth}
      siderCollapsedWidth={siderCollapsedWidth}
      footerVisible={themeSettings.footer.visible}
      footerHeight={themeSettings.footer.height}
      fixedFooter={themeSettings.footer.fixed}
      rightFooter={themeSettings.footer.right}
      Header={
        <GlobalHeader
          mode={themeSettings.layout.mode}
          siderWidth={themeSettings.sider.width}
          reverse={themeSettings.layout.reverseHorizontalMix}
          isMobile={isMobile}
        />
      }
      Tab={<GlobalTab />}
      Sider={
        <GlobalSider
          isVerticalMix={isVerticalMix}
          siderCollapse={siderCollapse}
          inverted={themeSettings.sider.inverted}
          isHorizontalMix={isHorizontalMix}
          headerHeight={themeSettings.header.height}
        />
      }
      Footer={<GlobalFooter />}
    >
      <GlobalContent />

      <GlobalMenu
        reverse={themeSettings.layout.reverseHorizontalMix}
        mode={themeSettings.layout.mode}
      />
      <Suspense fallback={null}>
        <ThemeDrawer />
      </Suspense>
    </AdminLayout>
  );
};

export default BaseLayout;
