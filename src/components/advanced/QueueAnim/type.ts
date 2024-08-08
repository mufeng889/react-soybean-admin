import type { IObject as IObj } from 'tween-one/lib/typings';
import type { IEaseType as IEase } from 'tween-one/lib/typings/IAnimObject';
import type React from 'react';

export type IObject = IObj;

export type IKeys = (string | number)[];

export type IQueueType = 'alpha' | 'left' | 'right' | 'top' | 'bottom' | 'scale' | 'scaleBig' | 'scaleX' | 'scaleY';
export type INumberOrArrayOrFunc =
  | number
  | [number, number]
  | ((e: { key: string; index: number }) => number | number[]);
export type IEaseType = IEase | [number, number, number, number];

export type IQueueTypeOrArrayOrFunc =
  | IQueueType
  | [IQueueType, IQueueType]
  | ((e: { key: string; index: number }) => IQueueType | [IQueueType, IQueueType]);
export type IEaseTypeOrArrayOrFunc =
  | IEaseType
  | IEaseType[]
  | ((e: { key: string; index: number }) => IEaseType | IEaseType[]);
export type IAnimConfigOrArrayOrFunc = {} | [{}] | ((e: { key: string; index: number }) => {} | {}[]);

interface AllHTMLAttributes extends Omit<React.SVGAttributes<any>, 'crossOrigin'>, React.AllHTMLAttributes<any> {}
export interface IProps extends Omit<AllHTMLAttributes, 'type'> {
  type?: IQueueTypeOrArrayOrFunc;
  animConfig?: IAnimConfigOrArrayOrFunc;
  delay?: INumberOrArrayOrFunc;
  duration?: INumberOrArrayOrFunc;
  interval?: INumberOrArrayOrFunc;
  onEnd?: ({ key, type, target }: { key: string | number; type: string; target: any }) => void;
  leaveReverse?: boolean;
  ease?: IEaseTypeOrArrayOrFunc;
  appear?: boolean;
  component?:
    | string
    | React.ClassType<any, React.Component, React.ComponentClass<any>>
    | React.ForwardRefExoticComponent<IProps & { ref?: React.Ref<any> }>
    | undefined;
  componentProps?: IObject;
  animatingClassName?: string[];
  forcedReplay?: boolean;
}
