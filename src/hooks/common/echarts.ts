import * as echarts from 'echarts/core';
import { BarChart, GaugeChart, LineChart, PictorialBarChart, PieChart, RadarChart, ScatterChart } from 'echarts/charts';
import type {
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  PictorialBarSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  ScatterSeriesOption
} from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent
} from 'echarts/components';
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import { getDarkMode, getThemeSettings } from '@/store/slice/theme';

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | ScatterSeriesOption
  | PictorialBarSeriesOption
  | RadarSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
>;

echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  PictorialBarChart,
  RadarChart,
  GaugeChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

interface ChartHooks {
  onRender?: (chart: echarts.ECharts) => void | Promise<void>;
  onUpdated?: (chart: echarts.ECharts) => void | Promise<void>;
  onDestroy?: (chart: echarts.ECharts) => void | Promise<void>;
}

/**
 * use echarts
 *
 * @param optionsFactory echarts options factory function
 * @param darkMode dark mode
 */
export function useEcharts<T extends ECOption>(optionsFactory: () => T, hooks: ChartHooks = {}) {
  const darkMode = useAppSelector(getDarkMode);

  const themeSettings = useAppSelector(getThemeSettings);

  const domRef = useRef<HTMLDivElement | null>(null);
  const initialSize = { width: 0, height: 0 };
  const size = useSize(domRef);

  const chart = useRef<echarts.ECharts | null>(null);
  const chartOptions = useRef<T>(optionsFactory());

  const {
    onRender = instance => {
      const textColor = darkMode ? 'rgb(224, 224, 224)' : 'rgb(31, 31, 31)';
      const maskColor = darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.8)';

      instance.showLoading({
        color: themeSettings.themeColor,
        textColor,
        fontSize: 14,
        maskColor
      });
    },
    onUpdated = instance => {
      instance.hideLoading();
    },
    onDestroy
  } = hooks;

  /**
   * whether can render chart
   *
   * when domRef is ready and initialSize is valid
   */
  function canRender() {
    return domRef.current && initialSize.width > 0 && initialSize.height > 0;
  }

  /** is chart rendered */
  function isRendered() {
    return Boolean(domRef.current && chart.current);
  }

  /**
   * update chart options
   *
   * @param callback callback function
   */
  async function updateOptions(callback: (opts: T, optsFactory: () => T) => ECOption = () => chartOptions.current) {
    if (!isRendered()) return;

    const updatedOpts = callback(chartOptions.current, optionsFactory);

    Object.assign(chartOptions.current, updatedOpts);

    if (isRendered()) {
      chart.current?.clear();
    }

    chart.current?.setOption({ ...chartOptions.current, backgroundColor: 'transparent' });

    await onUpdated?.(chart.current!);
  }

  function setOptions(options: T) {
    chart.current?.setOption(options);
  }

  /** render chart */
  async function render() {
    if (!isRendered()) {
      const chartTheme = darkMode ? 'dark' : 'light';

      chart.current = echarts.init(domRef.current, chartTheme);

      chart.current.setOption({ ...chartOptions.current, backgroundColor: 'transparent' });

      await onRender?.(chart.current);
    }
  }

  /** resize chart */
  function resize() {
    chart.current?.resize();
  }

  /** destroy chart */
  async function destroy() {
    if (!chart.current) return;

    await onDestroy?.(chart.current);
    chart.current?.dispose();
    chart.current = null;
  }

  /** change chart theme */
  async function changeTheme() {
    await destroy();
    await render();
    await onUpdated?.(chart.current!);
  }

  /**
   * render chart by size
   *
   * @param w width
   * @param h height
   */
  async function renderChartBySize(w: number, h: number) {
    initialSize.width = w;
    initialSize.height = h;

    // size is abnormal, destroy chart
    if (!canRender()) {
      await destroy();

      return;
    }

    // resize chart
    if (isRendered()) {
      resize();
    }

    // render chart
    await render();
  }
  useUnmount(() => {
    destroy();
  });

  useUpdateEffect(() => {
    renderChartBySize(size?.width as number, size?.height as number);
  }, [size]);

  useUpdateEffect(() => {
    changeTheme();
  }, [darkMode]);

  return {
    domRef,
    updateOptions,
    setOptions
  };
}
