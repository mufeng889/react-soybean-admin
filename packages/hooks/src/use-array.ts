import { useState } from 'react';

type ArrayState<T> = T[];
type ArrayActions<T, K extends keyof T> = {
  updateState: (newState: T[]) => void;
  push: (...newItems: T[]) => void;
  unshift: (...newItems: T[]) => void;
  remove: (itemKey: T[K]) => void;
  up: (itemKey: T[K]) => void;
  down: (itemKey: T[K]) => void;
  pop: () => void;
  shift: () => void;
  reverse: () => void;
  sort: (compareFn?: (a: T, b: T) => number) => void;
  splice: (start: number, deleteCount?: number, ...items: T[]) => void;
};

export default function useArray<T, K extends keyof T>(initState: T[], key?: K): [ArrayState<T>, ArrayActions<T, K>] {
  const [state, setState] = useState(initState);

  const resolvedKey = (key ?? 'id') as K;

  const updateState = (newState: T[]) => {
    setState(newState);
  };

  const push = (...newItems: T[]) => {
    setState(prevState => {
      // 确保新添加的元素的 key 是唯一的
      const newState = [...prevState, ...newItems];
      return newState.filter(
        (item, index, self) => index === self.findIndex(t => t[resolvedKey] === item[resolvedKey])
      );
    });
  };

  const unshift = (...newItems: T[]) => {
    setState(prevState => {
      // 确保新添加的元素的 key 是唯一的
      const newState = [...newItems, ...prevState];
      return newState.filter(
        (item, index, self) => index === self.findIndex(t => t[resolvedKey] === item[resolvedKey])
      );
    });
  };

  const remove = (itemKey: T[K]) => {
    setState(prevState => prevState.filter(i => i[resolvedKey] !== itemKey));
  };

  // 上移函数
  const up = (itemKey: T[K]) => {
    setState(prevState => {
      const index = prevState.findIndex(i => i[resolvedKey] === itemKey);

      // 如果该元素在第一个位置，就不能上移
      if (index <= 0) return prevState;

      // 交换当前元素与上一个元素的位置
      const newState = [...prevState];

      [newState[index], newState[index - 1]] = [newState[index - 1], newState[index]];

      return newState;
    });
  };

  // 下移函数
  const down = (itemKey: T[K]) => {
    setState(prevState => {
      const index = prevState.findIndex(i => i[resolvedKey] === itemKey);

      // 如果该元素已经在最后一个位置或找不到该元素，就不能下移
      if (index === prevState.length - 1 || index === -1) return prevState;

      // 交换当前元素与下一个元素的位置
      const newState = [...prevState];

      [newState[index], newState[index + 1]] = [newState[index + 1], newState[index]];

      return newState;
    });
  };

  const pop = () => {
    setState(prevState => {
      // 使用 slice(0, -1) 来移除最后一个元素
      return prevState.slice(0, -1);
    });
  };

  const shift = () => {
    setState(prevState => {
      // 使用 slice(1) 来移除第一个元素
      return prevState.slice(1);
    });
  };

  const reverse = () => {
    setState(prevState => {
      // 使用 spread 运算符 ... 和 reverse() 来反转数组
      return [...prevState].reverse();
    });
  };

  const sort = (compareFn?: (a: T, b: T) => number) => {
    setState(prevState => {
      // 使用 spread 运算符 ... 和 sort() 方法进行排序
      return [...prevState].sort(compareFn);
    });
  };

  const splice = (start: number, deleteCount?: number, ...items: T[]) => {
    const end = deleteCount ?? 0;
    setState(prevState => {
      // 使用 spread 运算符 ... 和 splice() 方法进行修改
      const newState = [...prevState];
      newState.splice(start, end, ...items);
      return newState;
    });
  };

  return [state, { updateState, push, unshift, remove, up, down, pop, shift, sort, splice, reverse }];
}
