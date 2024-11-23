import { useBoolean } from 'ahooks';
import { Skeleton } from 'antd';

export function Component({ url }: { readonly url: string }) {
  const [loading, { setFalse: endLoading }] = useBoolean(true);

  return (
    <>
      {loading && <Skeleton active />}
      <div className={loading ? 'h-0' : 'h-full'}>
        <iframe
          className="size-full"
          id="iframePage"
          src={url}
          onLoad={endLoading}
        />
      </div>
    </>
  );
}
