import ClassNames from 'classnames';

interface Props extends React.ComponentProps<'div'> {
  inverted?: boolean;
}

const DarkModeContainer: FC<Props> = memo(({ children, inverted, className, ...rest }) => {
  return (
    <div
      className={ClassNames(
        'bg-container text-base-text transition-300',
        { 'bg-inverted text-#1f1f1f': inverted },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export default DarkModeContainer;
