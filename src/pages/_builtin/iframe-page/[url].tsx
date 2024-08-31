import { Skeleton } from 'antd';
import { useBoolean } from 'ahooks';

export function Component({ url }: { url: string }) {
  const [loading, { setFalse: endLoading }] = useBoolean(true);

  return (
    <>
      {loading && <Skeleton active />}
      <div className={loading ? 'h-0' : 'h-full'}>
        <iframe
          onLoad={endLoading}
          id="iframePage"
          className="size-full"
          src={url}
        ></iframe>
      </div>
    </>
  );
}
