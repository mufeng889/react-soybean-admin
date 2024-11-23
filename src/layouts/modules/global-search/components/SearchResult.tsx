import classNames from 'classnames';

interface Props {
  active: boolean;
  enter: () => void;
  menu: App.Global.Menu;
  setActiveRouteName: (name: string) => void;
}

const SearchResult: FC<Props> = memo(({ active, enter, menu, setActiveRouteName }) => {
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
      onClick={enter}
      onMouseEnter={handleMouseEnter}
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
