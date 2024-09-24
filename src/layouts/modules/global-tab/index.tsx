import ClassNames from 'classnames';
import type BScroll from '@better-scroll/core';
import { PageTab } from '@sa/materials';
import { useUpdateEffect } from 'ahooks';
import { useRoute } from '@sa/simple-router';
import DarkModeContainer from '@/components/stateless/common/DarkModeContainer';
import BetterScroll from '@/components/stateless/custom/BetterScroll';
import { getDarkMode, getThemeSettings } from '@/store/slice/theme';
import { addTabByRoute, getActiveTabId, initTabStore, isTabRetain, removeTab, selectAllTabs } from '@/store/slice/tab';
import { getFullContent, getLocale, getReloadFlag, reloadPage, toggleFullContent } from '@/store/slice/app';
import ReloadButton from '@/components/stateless/common/ReloadButton';
import FullScreen from '@/components/stateless/common/FullScreen';
import { isPC } from '@/utils/agent';
import ContextMenu from './ContextMenu';

const GlobalTab = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bsWrapper = useRef<HTMLDivElement>(null);
  const bsWrapperSizeBounding = useRef<{ width: number; left: number }>({ width: 0, left: 0 });
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
      const { maxScrollX, x: leftX, scrollBy } = bsScrollRef.current;

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
        ref={bsWrapper}
        className="h-full flex-1-hidden"
      >
        <BetterScroll
          setBsScroll={setBsScroll}
          options={{ scrollX: true, scrollY: false, click: !isPCFlag }}
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
                disabledKeys={getContextMenuDisabledKeys(item.id, index)}
                tabId={item.id}
                key={item.id}
                locale={locale}
                i18nKey={item.i18nKey}
                active={item.id === activeTabId}
                mode={themeSettings.tab.mode}
                darkMode={darkMode}
              >
                <div id={item.id}>
                  <PageTab
                    mode={themeSettings.tab.mode}
                    darkMode={darkMode}
                    datatype={item.id}
                    id={item.id}
                    active={item.id === activeTabId}
                    activeColor={themeSettings.themeColor}
                    onClick={() => handleClickTab(item)}
                    handleClose={() => handleCloseTab(item)}
                    closable={!dispatch(isTabRetain(item.id))}
                    prefix={
                      <SvgIcon
                        icon={item.icon}
                        localIcon={item.localIcon}
                        className="inline-block align-text-bottom text-16px"
                      />
                    }
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
        toggleFullscreen={() => dispatch(toggleFullContent())}
        full={fullContent}
      />
    </DarkModeContainer>
  );
});

export default GlobalTab;
