import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { clearLeftTabs, clearRightTabs, clearTabs, removeTab } from '@/store/slice/tab';

interface ContextMenuProps {
  tabId: string;
  excludeKeys?: App.Global.DropdownKey[];
  disabledKeys?: App.Global.DropdownKey[];
  children: React.ReactNode;
  active: boolean;
  locale: App.I18n.LangType;
  mode: UnionKey.ThemeTabMode;
  i18nKey: App.Global.Tab['i18nKey'];
  darkMode: boolean;
}

interface DropdownOption {
  key: App.Global.DropdownKey;
  label: string;
  icon: string;
  disabled?: boolean;
}

function getMenu(options: DropdownOption[]) {
  const items: MenuProps['items'] = options.map(opt => ({
    key: opt.key,
    label: opt.label,
    icon: (
      <SvgIcon
        icon={opt.icon}
        className="text-icon"
      />
    ),
    disabled: opt.disabled
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

const ContextMenu: FC<ContextMenuProps> = memo(({ tabId, excludeKeys = [], disabledKeys = [], children }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const options = () => {
    const opts: DropdownOption[] = [
      {
        key: 'closeCurrent',
        label: t('dropdown.closeCurrent'),
        icon: 'ant-design:close-outlined'
      },
      {
        key: 'closeOther',
        label: t('dropdown.closeOther'),
        icon: 'ant-design:column-width-outlined'
      },
      {
        key: 'closeLeft',
        label: t('dropdown.closeLeft'),
        icon: 'mdi:format-horizontal-align-left'
      },
      {
        key: 'closeRight',
        label: t('dropdown.closeRight'),
        icon: 'mdi:format-horizontal-align-right'
      },
      {
        key: 'closeAll',
        label: t('dropdown.closeAll'),
        icon: 'ant-design:line-outlined'
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
    closeCurrent() {
      dispatch(removeTab(tabId));
    },
    closeOther() {
      dispatch(clearTabs([tabId]));
    },
    closeLeft() {
      dispatch(clearLeftTabs(tabId));
    },
    closeRight() {
      dispatch(clearRightTabs(tabId));
    },
    closeAll() {
      dispatch(clearTabs());
    }
  };

  const handleClick: MenuProps['onClick'] = e => {
    dropdownAction[e.key as App.Global.DropdownKey]();
  };

  return (
    <Dropdown
      trigger={['contextMenu']}
      menu={{ items: menu, onClick: handleClick }}
    >
      {children}
    </Dropdown>
  );
}, arePropsEqual);

export default ContextMenu;
