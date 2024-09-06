import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './style.css';
import ClassNames from 'classnames';
import { useRef } from 'react';
import { LAYOUT_SCROLL_EL_ID } from '@sa/materials';
import { getReloadFlag, setContentXScrollable } from '@/store/slice/app';

interface Props {
  /** Show padding for content */
  closePadding?: boolean;
}

function resetScroll() {
  const el = document.querySelector(`#${LAYOUT_SCROLL_EL_ID}`);

  el?.scrollTo({ left: 0, top: 0 });
}

const GlobalContent: FC<Props> = memo(({ closePadding }) => {
  const currentOutlet = useOutlet();
  const location = useLocation();
  const reloadFlag = useAppSelector(getReloadFlag);
  const nodeRef = useRef(null);
  const dispatch = useAppDispatch();

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={reloadFlag ? location.key : 'reload-page'}
        nodeRef={nodeRef}
        timeout={300}
        onExit={() => dispatch(setContentXScrollable(true))}
        onExited={resetScroll}
        onEntered={() => dispatch(setContentXScrollable(false))}
        classNames="page"
        unmountOnExit
      >
        <div
          className={ClassNames('h-full flex-grow bg-layout ', { 'p-16px': !closePadding })}
          ref={nodeRef}
        >
          {reloadFlag && currentOutlet}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
});

export default GlobalContent;
