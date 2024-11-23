import { useDebounceFn, useKeyPress } from 'ahooks';
import classNames from 'classnames';

import { getIsMobile } from '@/store/slice/app';

import SearchFooter from './SearchFooter';
import SearchResult from './SearchResult';

interface Props {
  onClose: () => void;
  show: boolean;
}

/**
 * Transform menu to searchMenus
 *
 * @param menus - menus
 * @param treeMap
 */
function transformMenuToSearchMenus(menus: App.Global.Menu[], treeMap: App.Global.Menu[] = []) {
  if (menus && menus.length === 0) return [];
  return menus.reduce((acc, cur) => {
    if (!cur.children) {
      acc.push(cur);
    }
    if (cur.children && cur.children.length > 0) {
      transformMenuToSearchMenus(cur.children, treeMap);
    }
    return acc;
  }, treeMap);
}

const SearchModal: FC<Props> = memo(({ onClose, show }) => {
  const isMobile = useAppSelector(getIsMobile);

  const { t } = useTranslation();

  const { allMenus } = useMixMenuContext();

  const [keyword, setKeyword] = useState<string>('');

  const [resultOptions, setResultOptions] = useState<App.Global.Menu[]>([]);

  const [activeRouteName, setActiveRouteName] = useState<string>('');

  const searchMenus = useMemo(() => transformMenuToSearchMenus(allMenus), [allMenus]);

  function handleClose() {
    // handle with setTimeout to prevent user from seeing some operations
    setTimeout(() => {
      onClose();
      setResultOptions([]);
      setKeyword('');
    }, 200);
  }

  function search() {
    const result = searchMenus.filter(menu => {
      const trimKeyword = keyword.toLocaleLowerCase().trim();
      return trimKeyword && menu.title?.includes(trimKeyword);
    });
    const activeName = result[0]?.key ?? '';

    setResultOptions(result);
    setActiveRouteName(activeName);
  }

  /** key up */
  function handleUp() {
    handleKeyPress(-1); // 方向 -1 表示向上
  }

  /** key down */
  function handleDown() {
    handleKeyPress(1); // 方向 1 表示向下
  }

  function getActivePathIndex() {
    return resultOptions.findIndex(item => item.key === activeRouteName);
  }

  function handleKeyPress(direction: 1 | -1) {
    const { length } = resultOptions;
    if (length === 0) return;

    const index = getActivePathIndex();
    if (index === -1) return;

    const activeIndex = (index + direction + length) % length; // 确保 index 在范围内循环
    const activeKey = resultOptions[activeIndex].key;

    setActiveRouteName(activeKey);
  }

  const router = useRouterPush();

  const handleSearch = useDebounceFn(search, { wait: 300 });

  /** key enter */
  function handleEnter() {
    if (resultOptions.length === 0 || activeRouteName === '') return;
    handleClose();
    router.routerPushByKeyWithMetaQuery(activeRouteName);
  }

  useKeyPress('Escape', handleClose);
  useKeyPress('Enter', handleEnter);
  useKeyPress('uparrow', handleUp);
  useKeyPress('downarrow', handleDown);

  return (
    <AModal
      className={classNames({ 'top-0px rounded-0': isMobile })}
      closable={false}
      footer={isMobile ? null : <SearchFooter />}
      height={isMobile ? '100%' : 400}
      open={show}
      style={isMobile ? { margin: 0, maxWidth: '100%', padding: 0 } : undefined}
      styles={{ content: { height: isMobile ? '100vh' : '100%', paddingBottom: 0 } }}
      width={isMobile ? '100%' : 630}
      onCancel={onClose}
    >
      <ASpace.Compact className="w-full">
        <AInput
          allowClear
          placeholder={t('common.keywordSearch')}
          prefix={<IconUilSearch className="text-15px text-#c2c2c2" />}
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onInput={handleSearch.run}
        />
        {isMobile && (
          <AButton
            ghost
            type="primary"
            onClick={handleClose}
          >
            {t('common.cancel')}
          </AButton>
        )}
      </ASpace.Compact>

      <div className="mt-20px">
        {resultOptions.length === 0 ? (
          <AEmpty />
        ) : (
          resultOptions.map(item => (
            <SearchResult
              active={item.key === activeRouteName}
              enter={handleEnter}
              key={item.key}
              menu={item}
              setActiveRouteName={setActiveRouteName}
            />
          ))
        )}
      </div>
    </AModal>
  );
});

export default SearchModal;
