import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

import { clearLeftTabs, clearRightTabs, clearTabs, removeTab } from '@/store/slice/tab';

interface ContextMenuProps {
  active: boolean;
  children: React.ReactNode;
  darkMode: boolean;
  disabledKeys?: App.Global.DropdownKey[];
  excludeKeys?: App.Global.DropdownKey[];
  i18nKey: App.Global.Tab['i18nKey'];
  locale: App.I18n.LangType;
  mode: UnionKey.ThemeTabMode;
  tabId: string;
}

interface DropdownOption {
  disabled?: boolean;
  icon: string;
  key: App.Global.DropdownKey;
  label: string;
}

function getMenu(options: DropdownOption[]) {
  const items: MenuProps['items'] = options.map(opt => ({
    disabled: opt.disabled,
    icon: (
      <SvgIcon
        className="text-icon"
        icon={opt.icon}
      />
    ),
    key: opt.key,
    label: opt.label
  }));

  return items;
}

function arePropsEqual(oldProps: Readonly<ContextMenuProps>, newProps: Readonly<ContextMenuProps>) {
  if (oldProps.active !== newProps.active) return false;
  if (oldProps.darkMode !== newProps.darkMode) return false;
  if (oldProps.i18nKey !== newProps.i18nKey) return false;
  if (oldProps.mode !== newProps.mode) return false;
  if (oldProps.locale !== newProps.locale) return false;
  if (oldProps.tabId !== newProps.tabId) return false;
  if (oldProps.excludeKeys?.length !== newProps.excludeKeys?.length) return false;

  const result = newProps.disabledKeys?.every((key, index) => key === oldProps.disabledKeys?.[index]);

  return result || false;
}

const ContextMenu: FC<ContextMenuProps> = memo(({ children, disabledKeys = [], excludeKeys = [], tabId }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const options = () => {
    const opts: DropdownOption[] = [
      {
        icon: 'ant-design:close-outlined',
        key: 'closeCurrent',
        label: t('dropdown.closeCurrent')
      },
      {
        icon: 'ant-design:column-width-outlined',
        key: 'closeOther',
        label: t('dropdown.closeOther')
      },
      {
        icon: 'mdi:format-horizontal-align-left',
        key: 'closeLeft',
        label: t('dropdown.closeLeft')
      },
      {
        icon: 'mdi:format-horizontal-align-right',
        key: 'closeRight',
        label: t('dropdown.closeRight')
      },
      {
        icon: 'ant-design:line-outlined',
        key: 'closeAll',
        label: t('dropdown.closeAll')
      }
    ];

    return opts
      .filter(opt => !excludeKeys.includes(opt.key))
      .map(opt => {
        if (disabledKeys.includes(opt.key)) {
          opt.disabled = true;
        }
        return opt;
      });
  };

  const menu = getMenu(options());

  const dropdownAction: Record<App.Global.DropdownKey, () => void> = {
    closeAll() {
      dispatch(clearTabs());
    },
    closeCurrent() {
      dispatch(removeTab(tabId));
    },
    closeLeft() {
      dispatch(clearLeftTabs(tabId));
    },
    closeOther() {
      dispatch(clearTabs([tabId]));
    },
    closeRight() {
      dispatch(clearRightTabs(tabId));
    }
  };

  const handleClick: MenuProps['onClick'] = e => {
    dropdownAction[e.key as App.Global.DropdownKey]();
  };

  return (
    <Dropdown
      menu={{ items: menu, onClick: handleClick }}
      trigger={['contextMenu']}
    >
      {children}
    </Dropdown>
  );
}, arePropsEqual);

export default ContextMenu;
