import classNames from 'classnames';
import { useDebounceFn, useKeyPress } from 'ahooks';
import { getIsMobile } from '@/store/slice/app';
import SearchFooter from './SearchFooter';
import SearchResult from './SearchResult';

interface Props {
  show: boolean;
  onClose: () => void;
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

const SearchModal: FC<Props> = memo(({ show, onClose }) => {
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
      footer={isMobile ? null : <SearchFooter />}
      styles={{ content: { paddingBottom: 0, height: isMobile ? '100vh' : '100%' } }}
      style={isMobile ? { margin: 0, padding: 0, maxWidth: '100%' } : undefined}
      height={isMobile ? '100%' : 400}
      open={show}
      width={isMobile ? '100%' : 630}
      className={classNames({ 'top-0px rounded-0': isMobile })}
      onCancel={onClose}
      closable={false}
    >
      <ASpace.Compact className="w-full">
        <AInput
          allowClear
          onInput={handleSearch.run}
          prefix={<IconUilSearch className="text-15px text-#c2c2c2" />}
          placeholder={t('common.keywordSearch')}
          onChange={e => setKeyword(e.target.value)}
          value={keyword}
        />
        {isMobile && (
          <AButton
            onClick={handleClose}
            type="primary"
            ghost
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
              enter={handleEnter}
              key={item.key}
              active={item.key === activeRouteName}
              setActiveRouteName={setActiveRouteName}
              menu={item}
            />
          ))
        )}
      </div>
    </AModal>
  );
});

export default SearchModal;
