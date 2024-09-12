interface Props {
  /** Label */
  label: React.ReactNode;
  children: React.ReactNode;
  suffix?: React.ReactNode;
}

const SettingItem: FC<Props> = memo(({ label, children, suffix }) => {
  return (
    <div className="w-full flex-y-center justify-between">
      <div>
        <span className="pr-8px text-base-text">{label}</span>
        {suffix}
      </div>
      {children}
    </div>
  );
});

export default SettingItem;
