import type { FC } from 'react';
import React, { memo } from 'react';
import classNames from 'classnames';
import type { ButtonTabProps } from '../../types';
import { ACTIVE_COLOR, createTabCssVars } from './shared';
import ChromeTab from './ChromeTab';
import ButtonTab from './ButtonTab';
import SvgClose from './SvgClose';
import styles from './index.module.css';

type PageTabProps = Omit<ButtonTabProps, 'onMouseUp'>;

const PageTab: FC<PageTabProps> = ({
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
}) => {
  const cssVars = createTabCssVars(activeColor) as React.CSSProperties;

  const getActiveTabComponent = {
    chrome: {
      component: ChromeTab,
      class: chromeClass
    },
    button: {
      component: ButtonTab,
      class: buttonClass
    }
  };

  const ActiveTabComponent = getActiveTabComponent[mode].component;

  const activeClass = getActiveTabComponent[mode].class;

  function closeTab(event: React.MouseEvent | TouchEvent) {
    event.stopPropagation();
    if (handleClose) handleClose();
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
      {...rest}
    >
      {children}
    </ActiveTabComponent>
  );
};

export default memo(PageTab);
