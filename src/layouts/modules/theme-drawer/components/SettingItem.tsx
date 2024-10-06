import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { getThemeDrawerVisible } from '@/store/slice/app';

interface Props {
  /** Label */
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  suffix?: React.ReactNode;
  seq: number;
  show?: boolean;
}

const variants = {
  open: (i: number) => ({
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05, // 每个元素的动画延迟 delay for each element's animation
      duration: 0.5, // 每个动画持续时间  duration of each animation
      type: 'tween'
    }
  }),
  closed: (i: number) => ({
    x: 500,
    y: -50,
    opacity: 0,
    transition: {
      delay: i * 0.05, // 每个元素的动画延迟 delay for each element's animation
      duration: 0.5, // 每个动画持续时间 duration of each animation
      type: 'tween'
    }
  }),
  exit: {
    x: 500,
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.5,
      type: 'tween'
    }
  }
};

const SettingItem: FC<Props> = memo(({ label, children, suffix, seq, className, show = true }) => {
  const themeDrawerVisible = useAppSelector(getThemeDrawerVisible);

  const id = useId();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={classNames('w-full flex-y-center justify-between', className)}
          variants={variants}
          initial="closed"
          id={id + seq}
          key={id + seq}
          exit="exit"
          animate={themeDrawerVisible ? 'open' : 'closed'}
          custom={seq}
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
