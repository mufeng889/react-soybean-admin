import classNames from 'classnames';

interface Props {
  menu: App.Global.Menu;
  active: boolean;
  setActiveRouteName: (name: string) => void;
  enter: () => void;
}

const SearchResult: FC<Props> = memo(({ menu, active, setActiveRouteName, enter }) => {
  function handleMouseEnter() {
    setActiveRouteName(menu.key);
  }

  return (
    <div
      className={classNames(
        'mt-8px h-56px flex-y-center cursor-pointer justify-between rounded-4px bg-#e5e7eb  px-14px dark:bg-dark',
        { 'bg-primary': active },
        { 'text-#fff': active }
      )}
      onMouseEnter={handleMouseEnter}
      onClick={enter}
    >
      <span className="ml-5px flex-1">
        {menu.icon}
        {menu.label}
      </span>

      <IconAntDesignEnterOutlined />
    </div>
  );
});

export default SearchResult;
