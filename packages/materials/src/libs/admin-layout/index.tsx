import { type FC } from 'react';
import classNames from 'classnames';
import type { AdminLayoutProps } from '../../types';
import { LAYOUT_MAX_Z_INDEX, LAYOUT_SCROLL_EL_ID, createLayoutCssVars } from './shared';
import style from './index.module.css';

// eslint-disable-next-line complexity
const AdminLayout: FC<AdminLayoutProps> = ({
  mode = 'vertical',
  scrollMode = 'content',
  isMobile,
  scrollElId = LAYOUT_SCROLL_EL_ID,
  commonClass = 'transition-all-300',
  fixedTop = true,
  maxZIndex = LAYOUT_MAX_Z_INDEX,
  headerVisible = true,
  headerHeight = 56,
  tabVisible = true,
  tabHeight = 44,
  siderVisible = true,
  siderCollapse = false,
  siderWidth = 220,
  siderCollapsedWidth = 64,
  footerVisible = true,
  Header,
  footerHeight = 48,
  headerClass,
  Sider,
  scrollWrapperClass,
  rightFooter = false,
  fullContent,
  Tab,
  tabClass,
  siderClass,
  fixedFooter,
  Footer,
  mobileSiderClass,
  children,
  updateSiderCollapse,
  contentClass,
  footerClass
}) => {
  const cssVar = createLayoutCssVars({
    mode,
    isMobile,
    maxZIndex,
    headerHeight,
    tabHeight,
    siderWidth,
    siderCollapsedWidth,
    footerHeight
  }) as React.CSSProperties;
  // config visible
  const showHeader = Boolean(Header) && headerVisible;
  const showSider = !isMobile && Boolean(Sider) && siderVisible;
  const showMobileSider = isMobile && Boolean(Sider) && siderVisible;
  const showTab = Boolean(Tab) && tabVisible;
  const showFooter = Boolean(Footer) && footerVisible;

  // scroll mode
  const isWrapperScroll = scrollMode === 'wrapper';
  const isContentScroll = scrollMode === 'content';
  // layout direction
  const isVertical = mode === 'vertical';
  const isHorizontal = mode === 'horizontal';
  const fixedHeaderAndTab = fixedTop || (isHorizontal && isWrapperScroll);

  // css
  const leftGapClass = () => {
    if (!fullContent && showSider) {
      return siderCollapse ? style['left-gap_collapsed'] : style['left-gap'];
    }
    return '';
  };
  const headerLeftGapClass = isVertical ? leftGapClass() : '';

  const footerLeftGapClass = () => {
    const condition1 = isVertical;
    const condition2 = isHorizontal && isWrapperScroll && !fixedFooter;
    const condition3 = Boolean(isHorizontal && rightFooter);

    if (condition1 || condition2 || condition3) {
      return leftGapClass();
    }

    return '';
  };
  const siderPaddingClass = () => {
    let cls = '';

    if (showHeader && !headerLeftGapClass) {
      cls += style['sider-padding-top'];
    }
    if (showFooter && !footerLeftGapClass()) {
      cls += ` ${style['sider-padding-bottom']}`;
    }

    return cls;
  };
  // display
  const headerDisplay = !fullContent && fixedHeaderAndTab ? 'block' : 'none';
  const siderDisplay = fullContent ? 'none' : 'block';
  const mobileSider = siderCollapse ? 'none' : 'block';
  const footerDisplay = !fullContent && fixedFooter ? 'block' : 'none';

  return (
    <section
      className={classNames('relative h-full', commonClass)}
      style={cssVar}
    >
      <section
        id={isWrapperScroll ? scrollElId : ''}
        className={classNames('h-full flex flex-col', scrollWrapperClass, commonClass, {
          'overflow-y-auto': isWrapperScroll
        })}
      >
        {/* Header */}
        {showHeader && (
          <>
            <header
              className={classNames(
                'flex-shrink-0',
                style['layout-header'],
                commonClass,
                headerClass,
                headerLeftGapClass,
                { 'absolute top-0 left-0 w-full': fixedHeaderAndTab }
              )}
              style={{ display: fullContent ? 'none' : 'block' }}
            >
              {Header}
            </header>
            <div
              style={{ display: headerDisplay }}
              className={classNames('flex-shrink-0 overflow-hidden', style['layout-header-placement'])}
            ></div>
          </>
        )}

        {/* Tab */}
        {showTab && (
          <>
            <div
              className={classNames(
                'flex-shrink-0',
                style['layout-tab'],
                commonClass,
                tabClass,
                { 'top-0!': fullContent || !showHeader },
                leftGapClass(),
                { 'absolute left-0 w-full': fixedHeaderAndTab }
              )}
            >
              {Tab}
            </div>

            <div
              style={{ display: fixedHeaderAndTab || fullContent ? 'block' : 'none' }}
              className={classNames('flex-shrink-0 overflow-hidden', [style['layout-tab-placement']])}
            ></div>
          </>
        )}

        {/* Sider */}
        {showSider && (
          <aside
            style={{ display: siderDisplay }}
            className={classNames(
              'absolute left-0 top-0 h-full',
              commonClass,
              siderClass,
              siderPaddingClass(),
              siderCollapse ? style['layout-sider_collapsed'] : style['layout-sider']
            )}
          >
            {Sider}
          </aside>
        )}

        {/* Mobile Sider */}
        {showMobileSider && (
          <>
            <aside
              className={classNames('absolute left-0 top-0 h-full w-0 bg-white', [
                commonClass,
                siderClass,
                mobileSiderClass,
                style['layout-mobile-sider'],
                siderCollapse ? 'overflow-hidden' : style['layout-sider']
              ])}
            >
              {Sider}
            </aside>
            <div
              style={{ display: mobileSider }}
              className={classNames('absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.2)]', [
                style['layout-mobile-sider-mask']
              ])}
              onClick={() => updateSiderCollapse()}
            ></div>
          </>
        )}

        {/*  Main Content  */}
        <main
          id={isContentScroll ? scrollElId : ''}
          className={classNames('flex flex-col  flex-grow bg-layout', commonClass, contentClass, leftGapClass(), {
            'overflow-y-auto': isContentScroll
          })}
        >
          {children}
        </main>

        {/* Footer */}
        {showFooter && (
          <>
            <footer
              style={{ display: siderDisplay }}
              className={classNames(
                'flex-shrink-0',
                style['layout-footer'],
                commonClass,
                footerClass,
                footerLeftGapClass(),
                { 'absolute left-0 bottom-0 w-full': fixedFooter }
              )}
            >
              {Footer}
            </footer>
            <div
              style={{ display: footerDisplay }}
              className={classNames('flex-shrink-0 overflow-hidden', style['layout-footer-placement'])}
            ></div>
          </>
        )}
      </section>
    </section>
  );
};
export default AdminLayout;
