import type { SubMenuType } from 'antd/es/menu/interface';
import { useRouter } from '@sa/simple-router';
import { setActiveFirstLevelMenuKey } from '@/store/slice/tab';
import FirstLevelMenu from './FirstLevelMenu';

const HorizontalMixMenu = memo(() => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleSelectMixMenu(menu: SubMenuType) {
    dispatch(setActiveFirstLevelMenuKey(menu.key));

    if (!menu.children?.length) {
      router.push({ name: menu.key });
    }
  }
  return <FirstLevelMenu onSelect={handleSelectMixMenu} />;
});

export default HorizontalMixMenu;
