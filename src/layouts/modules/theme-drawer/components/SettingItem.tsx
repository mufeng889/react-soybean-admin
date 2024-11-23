import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { getThemeDrawerVisible } from '@/store/slice/app';

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Label */
  label: React.ReactNode;
  seq: number;
  show?: boolean;
  suffix?: React.ReactNode;
}

const variants = {
  closed: (i: number) => ({
    opacity: 0,
    transition: {
      delay: i * 0.05, // 每个元素的动画延迟 delay for each element's animation
      duration: 0.5, // 每个动画持续时间 duration of each animation
      type: 'tween'
    },
    x: 500,
    y: -50
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      type: 'tween'
    },
    x: 500,
    y: -20
  },
  open: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.05, // 每个元素的动画延迟 delay for each element's animation
      duration: 0.5, // 每个动画持续时间  duration of each animation
      type: 'tween'
    },
    x: 0,
    y: 0
  })
};

const SettingItem: FC<Props> = memo(({ children, className, label, seq, show = true, suffix }) => {
  const themeDrawerVisible = useAppSelector(getThemeDrawerVisible);

  const id = useId();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          animate={themeDrawerVisible ? 'open' : 'closed'}
          className={classNames('w-full flex-y-center justify-between', className)}
          custom={seq}
          exit="exit"
          id={id + seq}
          initial="closed"
          key={id + seq}
          variants={variants}
          whileHover={{ scale: 1.1 }}
        >
          <div>
            <span className="pr-8px text-base-text">{label}</span>
            {suffix}
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default SettingItem;
