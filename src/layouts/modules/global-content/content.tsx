import KeepAlive from 'keepalive-for-react';

const Content = ({ cacheKey, reloadFlag }: { cacheKey: string; reloadFlag: boolean }) => {
  const currentOutlet = useOutlet();
  return (
    <KeepAlive
      activeName={cacheKey}
      max={10}
      strategy={'LRU'}
    >
      {reloadFlag && currentOutlet}
    </KeepAlive>
  );
};

export default Content;
