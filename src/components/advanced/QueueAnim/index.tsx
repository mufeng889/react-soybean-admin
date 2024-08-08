import {
  cloneElement,
  createElement,
  createRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import TweenOne, { Ticker } from 'tween-one';

import {
  findChildInChildrenByKey,
  mergeChildren,
  toArrayChildren,
  transformArguments,
  windowIsUndefined
} from './utils';
import AnimTypes from './animTypes';

import type { IKeys, IObject, IProps, IQueueType } from './type';

const noop = () => {};

const QueueAnim = forwardRef(function QueueAnim(props: IProps, ref: any) {
  const {
    component = 'div',
    componentProps = {},
    interval = 100,
    duration = 450,
    delay = 0,
    type = 'right',
    animConfig = null,
    ease = 'easeOutQuart',
    leaveReverse = false,
    forcedReplay = false,
    animatingClassName = ['queue-anim-entering', 'queue-anim-leaving'],
    onEnd = noop,
    appear = true,
    ...tagProps
  } = props;

  /** @param childrenShow; 记录 animation 里是否需要 startAnim; 当前元素是否处在显示状态 enterBegin 到 leaveComplete 之前都处于显示状态 */
  const childrenShow = useRef<IObject>({});

  /** @param keysToEnter; 记录进场的 key; */
  const keysToEnter = useRef<IKeys>([]);
  const recordKeysToEnter = useRef<IKeys>([]);
  /** @param keysToLeave; 记录出场的 key; */
  const keysToLeave = useRef<IKeys>([]);
  const recordKeysToLeave = useRef<IKeys>([]);

  /** @param placeholderTimeoutIds; 进场时 deley 的 timeout 记录; */
  const placeholderTimeoutIds = useRef<IObject>({});
  /** @param childRefs; 储存 children 的 ref; */
  const childRefs = useRef<IObject>({});
  /** @param recordAnimKeys; 记录启动动画 key */
  const recordAnimKeys = useRef<IObject>({});

  /** @param recordAnimKeys; 记录启动动画 key */
  const recordTweenKeys = useRef<IObject>({});

  /** @param oneEnterBool 记录第一次进入 */
  const oneEnterBool = useRef(false);

  const originalChildren = useRef<any[]>([]);

  const [child, setChild] = useState<any[]>();
  const [childShow, setChildShow] = useState<IObject>({});

  const getTweenSingleConfig = (data: any, num: number, enterOrLeave?: 0 | 1) => {
    const obj: IObject = {};
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) {
        obj[key] = data[key][num];
      } else if ((!enterOrLeave && !num) || (enterOrLeave && num)) {
        obj[key] = data[key];
      }
    });
    return obj;
  };

  const getTweenAnimConfig = (data: any, num: number, enterOrLeave?: 0 | 1) => {
    if (Array.isArray(data)) {
      return data.map(item => {
        return getTweenSingleConfig(item, num, enterOrLeave);
      });
    }
    return getTweenSingleConfig(data, num, enterOrLeave);
  };

  const getTweenType = ($type: IQueueType, num: number) => {
    const data = AnimTypes[$type];
    return getTweenAnimConfig(data, num);
  };

  // eslint-disable-next-line max-params
  const getAnimData = (key: string | number, i: number, enterOrLeave: 0 | 1, startOrEnd: 0 | 1) =>
    /**
     * transformArguments 第一个为 enter, 第二个为 leave； getTweenAnimConfig or getTweenType 第一个为到达的位置， 第二个为开始的位置。 用 tween-one
     * 的数组来实现老的动画逻辑。。。
     */
    animConfig
      ? getTweenAnimConfig(transformArguments(animConfig, key, i)[enterOrLeave], startOrEnd, enterOrLeave)
      : getTweenType(transformArguments(type, key, i)[enterOrLeave], startOrEnd);

  const getTweenData = (key: string | number, i: number, $type: string) => {
    const enterOrLeave = $type === 'enter' ? 0 : 1;
    const start = $type === 'enter' ? 1 : 0;
    const end = $type === 'enter' ? 0 : 1;
    const animate = getAnimData(key, i, enterOrLeave, end);
    const startAnim =
      $type === 'enter' && (forcedReplay || !childrenShow.current[key])
        ? getAnimData(key, i, enterOrLeave, start)
        : null;
    let $ease = transformArguments(ease, key, i)[enterOrLeave];
    const $duration = transformArguments(duration, key, i)[enterOrLeave];
    if (Array.isArray(ease) && (ease.length > 2 || Array.isArray(ease[0]))) {
      $ease = $ease.map((num: number) => num * 100);
      $ease = `M0,100C${$ease[0]},${100 - $ease[1]},${$ease[2]},${100 - $ease[3]},100,0`;
    }
    return {
      startAnim,
      animate,
      ease: $ease,
      duration: $duration
    };
  };

  const enterBegin = (key: string | number, e: any) => {
    const elem = e.targets;
    elem.className = elem.className.replace(animatingClassName[1], '');
    if (!elem.className.includes(animatingClassName[0])) {
      elem.className = `${elem.className} ${animatingClassName[0]}`.trim();
    }
    if (keysToEnter.current.includes(key)) {
      keysToEnter.current.splice(keysToEnter.current.indexOf(key), 1);
    }
    childrenShow.current[key] = true;
  };
  const enterComplete = (key: string | number, e: any) => {
    if (keysToLeave.current.includes(key)) {
      return;
    }
    const elem = e.targets;
    elem.className = elem.className.replace(animatingClassName[0], '').trim();
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete recordTweenKeys.current[key];
    onEnd({ key, type: 'enter', target: elem });
  };

  const leaveBegin = (_key: string | number, e: any) => {
    const elem = e.targets;
    elem.className = elem.className.replace(animatingClassName[0], '');
    if (!elem.className.includes(animatingClassName[1])) {
      elem.className = `${elem.className} ${animatingClassName[1]}`.trim();
    }
  };

  const leaveComplete = (key: string | number, e: any) => {
    // 切换时同时触发 onComplete。 手动跳出。。。
    // eslint-disable-next-line react/prop-types
    toArrayChildren(props.children).findIndex(c => c && c.key === key);
    if (toArrayChildren(props.children).findIndex(c => c && c.key === key) >= 0) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete childrenShow.current[key];
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete recordTweenKeys.current[key];
    originalChildren.current = originalChildren.current.filter(c => c.key !== key);
    // 这里不用启动动画，，直接删；
    if (keysToLeave.current.includes(key)) {
      keysToLeave.current.splice(keysToLeave.current.indexOf(key), 1);
    }
    const needLeave = keysToLeave.current.some(c => childShow[c]);

    if (!needLeave) {
      const currentChildren = toArrayChildren(props.children);
      setChild(currentChildren);
      setChildShow({ ...childrenShow.current });
      recordKeysToLeave.current.forEach(k => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete recordAnimKeys.current[k];
      });
    }
    const elem = e.targets;
    elem.className = elem.className.replace(animatingClassName[1], '').trim();
    onEnd({ key, type: 'leave', target: elem });
  };

  const performEnterBegin = (key: string | number) => {
    childShow[key] = true;
    Ticker.clear(placeholderTimeoutIds.current[key]);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete placeholderTimeoutIds.current[key];
    setChildShow({ ...childShow });
  };

  const performEnter = (key: string | number, i: number) => {
    const $interval = transformArguments(interval, key, i)[0];
    const $delay = transformArguments(delay, key, i)[0];
    placeholderTimeoutIds.current[key] = Ticker.timeout(
      () => {
        performEnterBegin(key);
      },
      $interval * i + $delay
    );
  };

  const performLeave = (key: string | number) => {
    Ticker.clear(placeholderTimeoutIds.current[key]);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete placeholderTimeoutIds.current[key];
  };

  // eslint-disable-next-line max-params
  const getTweenOneEnterOrLeave = (key: string | number, i: number, $delay: number, $type: string) => {
    const animateData = getTweenData(key, i, $type);
    const onStart = (e: any) => {
      ($type === 'enter' ? enterBegin : leaveBegin)(key, e);
    };
    const onComplete = (e: any) => {
      ($type === 'enter' ? enterComplete : leaveComplete)(key, e);
    };
    if (Array.isArray(animateData.animate)) {
      const length = animateData.animate.length - 1;
      const animation = animateData.animate.map((item, ii) => {
        return {
          ...item,
          startAt: animateData.startAnim ? animateData.startAnim[ii] : undefined,
          duration: animateData.duration / length,
          delay: !ii && $type === 'leave' ? $delay : 0,
          onStart: !ii ? onStart : undefined,
          onComplete: ii === length ? onComplete : undefined
        };
      });
      return animation;
    }
    return {
      ...animateData.animate,
      startAt: animateData.startAnim || undefined,
      ease: animateData.ease,
      duration: animateData.duration,
      onStart,
      onComplete,
      delay: $delay
    };
  };
  useEffect(
    () => () => {
      Object.keys(recordTweenKeys.current).forEach(key => {
        const tween = recordTweenKeys.current[key];
        if (!tween) {
          return;
        }
        tween.kill();
      });
    },
    []
  );
  useEffect(() => {
    const nextChildren = toArrayChildren(props.children).filter(c => c);
    const currentChildren = originalChildren.current.filter(item => item);
    const newChildren = mergeChildren(currentChildren, nextChildren);
    const $keysToEnter: IKeys = [];
    const $keysToLeave: IKeys = [];
    if (!appear && !oneEnterBool.current) {
      const $childShow: IObject = {};
      newChildren.forEach((c: any) => {
        if (!c || !c.key) {
          return;
        }
        $childShow[c.key] = true;
      });
      originalChildren.current = newChildren;
      childrenShow.current = { ...$childShow };
      setChildShow($childShow);
    } else {
      // console.log(nextChildren, recordAnimKeys.current, keysToEnter.current, keysToLeave.current);
      currentChildren.forEach(c => {
        if (!c) {
          return;
        }
        const { key } = c;
        const hasNext = findChildInChildrenByKey(nextChildren, key);
        if (!hasNext && key) {
          $keysToLeave.push(key);
          Ticker.clear(placeholderTimeoutIds.current[key]);
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete placeholderTimeoutIds.current[key];
        }
      });

      nextChildren.forEach((c: any) => {
        if (!c) {
          return;
        }

        const { key } = c;
        const hasPrev = findChildInChildrenByKey(currentChildren, key);
        // 如果 nextChildren 和当前的一致，且动画里是出场，改回进场；
        if (
          (!hasPrev && key) ||
          ((!recordAnimKeys.current[key] ||
            recordAnimKeys.current[key] === 'leave' ||
            keysToEnter.current.includes(key)) &&
            !$keysToLeave.includes(key))
        ) {
          $keysToEnter.push(key);
        }
      });
    }
    // console.log('child update', $keysToEnter, $keysToLeave, newChildren);

    keysToEnter.current = $keysToEnter;
    // keysToEnter 在启动时就会删除；
    recordKeysToEnter.current = [...$keysToEnter];
    keysToLeave.current = $keysToLeave;
    recordKeysToLeave.current = [...$keysToLeave];

    // console.log($keysToEnter, $keysToLeave);
    setChild(newChildren);
  }, [props.children]);
  useLayoutEffect(() => {
    originalChildren.current = child || [];
    if (appear || oneEnterBool.current) {
      const $keysToEnter = [...keysToEnter.current];
      const $keysToLeave = [...keysToLeave.current];
      $keysToEnter.forEach(performEnter);
      $keysToLeave.forEach(performLeave);
    }
    if (child) {
      oneEnterBool.current = true;
    }
  }, [child]);
  useLayoutEffect(() => {
    if (child) {
      child.forEach(item => {
        const { key } = item;
        const dom = childRefs.current[key];
        if (!dom) {
          return;
        }
        let animation;
        let index = keysToLeave.current.indexOf(key); // children.findIndex(c => c.key === key);
        const $interval = transformArguments(interval, key, index);
        const $delay = transformArguments(delay, key, index);

        // 处理出场
        if (index >= 0) {
          if (recordAnimKeys.current[key] === 'leave') {
            return;
          }

          const order = leaveReverse ? keysToLeave.current.length - index - 1 : index;
          const d = $interval[1] * order + $delay[1];
          animation = getTweenOneEnterOrLeave(key, index, d, 'leave');
          recordAnimKeys.current[key] = 'leave';
        } else {
          if (recordAnimKeys.current[key] === 'enter' || !keysToEnter.current.includes(key)) {
            return;
          }
          index = recordKeysToEnter.current.indexOf(key);
          const d = $interval[0] * index + $delay[0];
          // console.log(recordAnimKeys.current[key], dom);
          animation = getTweenOneEnterOrLeave(key, index, recordAnimKeys.current[key] === 'leave' ? d : 0, 'enter');
          recordAnimKeys.current[key] = 'enter';
        }
        if (recordTweenKeys.current[key]) {
          recordTweenKeys.current[key].kill();
        }

        if (forcedReplay) {
          const anim = {
            ...(Array.isArray(animation) ? animation[0].startAt : animation.startAt),
            type: 'set'
          };
          TweenOne(dom, { animation: anim });
        }
        recordTweenKeys.current[key] = TweenOne(dom, {
          animation
        });
      });
    }
  }, [childShow, child]);

  return useMemo(() => {
    // console.log('--------render--------', childShow);
    if (windowIsUndefined) {
      return createElement(component, { ...tagProps, ...componentProps, ref });
    }
    const childrenToRender = toArrayChildren(child).map(item => {
      if (!item || !item.key) {
        return item;
      }
      return (
        childShow[item.key] &&
        cloneElement(item, {
          ref: (c: any) => {
            childRefs.current[item.key] = c instanceof Element ? c : createRef();
            if (!c) {
              delete childRefs.current[item.key];
            }
          },
          key: item.key
        })
      );
    });
    const p = {
      ...tagProps,
      ...componentProps,
      ref
    };
    return createElement(component, p, childrenToRender);
  }, [childShow, child]);
});
export default QueueAnim;
