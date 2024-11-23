import type BScroll from '@better-scroll/core';
import { PageTab } from '@sa/materials';
import { useRoute } from '@sa/simple-router';
import { useUpdateEffect } from 'ahooks';
import ClassNames from 'classnames';

import DarkModeContainer from '@/components/stateless/common/DarkModeContainer';
import FullScreen from '@/components/stateless/common/FullScreen';
import ReloadButton from '@/components/stateless/common/ReloadButton';
import BetterScroll from '@/components/stateless/custom/BetterScroll';
import { getFullContent, getLocale, getReloadFlag, reloadPage, toggleFullContent } from '@/store/slice/app';
import { setRemoveCacheKey } from '@/store/slice/route';
import { addTabByRoute, getActiveTabId, initTabStore, isTabRetain, removeTab, selectAllTabs } from '@/store/slice/tab';
import { getDarkMode, getThemeSettings } from '@/store/slice/theme';
import { isPC } from '@/utils/agent';

import ContextMenu from './ContextMenu';

const GlobalTab = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bsWrapper = useRef<HTMLDivElement>(null);
  const bsWrapperSizeBounding = useRef<{ left: number; width: number }>({ left: 0, width: 0 });
  const tabRef = useRef<HTMLDivElement>(null);
  const route = useRoute();
  const isPCFlag = isPC();
  const bsScrollRef = useRef<BScroll | null>(null);
  const locale = useAppSelector(getLocale);
  const reloadFlag = useAppSelector(getReloadFlag);
  const fullContent = useAppSelector(getFullContent);
  const tabs = useAppSelector(selectAllTabs);
  const themeSettings = useAppSelector(getThemeSettings);
  const darkMode = useAppSelector(getDarkMode);
  const activeTabId = useAppSelector(getActiveTabId);

  const setBsScroll = (bscroll: BScroll) => {
    bsScrollRef.current = bscroll;
  };

  function scrollByClientX(clientX: number) {
    const { left, width } = bsWrapperSizeBounding.current;
    const currentX = clientX - left;

    const deltaX = currentX - width / 2;

    if (bsScrollRef.current) {
      const { maxScrollX, scrollBy, x: leftX } = bsScrollRef.current;

      const rightX = maxScrollX - leftX;
      const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);

      scrollBy(update, 0, 300);
    }
  }

  async function scrollToActiveTab() {
    if (!tabRef.current) return;

    const { children } = tabRef.current;

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];

      const tabId = child.id;

      if (tabId === activeTabId) {
        const { left, width } = child.getBoundingClientRect();

        const clientX = left + width / 2;

        setTimeout(() => {
          scrollByClientX(clientX);
        }, 50);

        break;
      }
    }
  }

  function handleCloseTab(tab: App.Global.Tab) {
    dispatch(removeTab(tab.id));
    dispatch(setRemoveCacheKey(tab.routeKey));
  }

  function handleClickTab(tab: App.Global.Tab) {
    navigate(tab.fullPath);
  }

  function getContextMenuDisabledKeys(tabId: string, index: number) {
    const disabledKeys: App.Global.DropdownKey[] = [];
    const isRetain = dispatch(isTabRetain(tabId));
    if (isRetain) {
      const homeDisable: App.Global.DropdownKey[] = ['closeCurrent', 'closeLeft'];
      disabledKeys.push(...homeDisable);
    }
    if (index === 1) disabledKeys.push('closeLeft');

    if (index === tabs.length - 1) disabledKeys.push('closeRight');
    return disabledKeys;
  }

  function refresh() {
    dispatch(reloadPage());
  }

  function removeFocus() {
    (document.activeElement as HTMLElement)?.blur();
  }

  useUpdateEffect(() => {
    scrollToActiveTab();
  }, [activeTabId]);

  useEffect(() => {
    dispatch(addTabByRoute(route));
  }, [route, dispatch]);

  useMount(() => {
    if (bsWrapper.current) {
      const { left, width } = bsWrapper.current.getBoundingClientRect();
      bsWrapperSizeBounding.current = { left, width };
      Promise.resolve().then(() => {
        scrollToActiveTab();
      });
    }
  });

  useLayoutEffect(() => {
    dispatch(initTabStore());
  }, [dispatch]);

  return (
    <DarkModeContainer className="size-full flex-y-center px-16px shadow-tab">
      <div
        className="h-full flex-1-hidden"
        ref={bsWrapper}
      >
        <BetterScroll
          options={{ click: !isPCFlag, scrollX: true, scrollY: false }}
          setBsScroll={setBsScroll}
          onClick={removeFocus}
        >
          <div
            ref={tabRef}
            className={ClassNames('h-full flex pr-18px', [
              themeSettings.tab.mode === 'chrome' ? 'items-end' : 'items-center gap-12px'
            ])}
          >
            {tabs.map((item, index) => (
              <ContextMenu
                active={item.id === activeTabId}
                darkMode={darkMode}
                disabledKeys={getContextMenuDisabledKeys(item.id, index)}
                i18nKey={item.i18nKey}
                key={item.id}
                locale={locale}
                mode={themeSettings.tab.mode}
                tabId={item.id}
              >
                <div id={item.id}>
                  <PageTab
                    active={item.id === activeTabId}
                    activeColor={themeSettings.themeColor}
                    closable={!dispatch(isTabRetain(item.id))}
                    darkMode={darkMode}
                    datatype={item.id}
                    handleClose={() => handleCloseTab(item)}
                    id={item.id}
                    mode={themeSettings.tab.mode}
                    prefix={
                      <SvgIcon
                        className="inline-block align-text-bottom text-16px"
                        icon={item.icon}
                        localIcon={item.localIcon}
                      />
                    }
                    onClick={() => handleClickTab(item)}
                  >
                    <div className="max-w-240px ellipsis-text">{item.i18nKey ? t(item.i18nKey) : item.label}</div>
                  </PageTab>
                </div>
              </ContextMenu>
            ))}
          </div>
        </BetterScroll>
      </div>
      <ReloadButton
        handClick={refresh}
        loading={!reloadFlag}
      />
      <FullScreen
        full={fullContent}
        toggleFullscreen={() => dispatch(toggleFullContent())}
      />
    </DarkModeContainer>
  );
});

export default GlobalTab;
