import React, { memo } from 'react';
import classNames from 'classnames';
import type { ButtonTabProps } from '../../types';
import { ACTIVE_COLOR, createTabCssVars } from './shared';
import ChromeTab from './ChromeTab';
import ButtonTab from './ButtonTab';
import SvgClose from './SvgClose';
import styles from './index.module.css';
type PageTabProps = Omit<ButtonTabProps, 'onMouseUp'>;
const PageTab = memo(function PageTab({
  mode = 'chrome',
  activeColor = ACTIVE_COLOR,
  closable = true,
  buttonClass,
  chromeClass,
  children,
  style,
  className,
  suffix,
  handleClose,
  active,
  darkMode,
  prefix,
  ...rest
}: PageTabProps) {
  const cssVars = createTabCssVars(activeColor) as React.CSSProperties;
  const getActiveTabComponent = () => {
    const tabComponentMap = {
      chrome: {
        component: ChromeTab,
        class: chromeClass
      },
      button: {
        component: ButtonTab,
        class: buttonClass
      }
    };

    return tabComponentMap[mode];
  };
  const ActiveTabComponent = getActiveTabComponent().component;
  const activeClass = getActiveTabComponent().class;
  function closeTab(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    handleClose?.();
  }
  function handleMouseup(e: React.MouseEvent<HTMLDivElement>) {
    // close tab by mouse wheel button click
    if (e.button === 1) {
      handleClose?.();
    }
  }

  const suffixComponent =
    suffix ||
    (closable && (
      <SvgClose
        className={styles['svg-close']}
        onClick={closeTab}
      />
    ));
  return (
    <ActiveTabComponent
      prefix={prefix}
      suffix={suffixComponent}
      active={active}
      darkMode={darkMode}
      className={classNames(activeClass, className)}
      style={{ ...cssVars, ...style }}
      onMouseUp={handleMouseup}
      {...rest}
    >
      {children}
    </ActiveTabComponent>
  );
});

export default PageTab;
