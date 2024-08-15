import type { FC } from 'react';
import SvgIcon from '../custom/svg-icon';
interface Props {
  error: Error;
}

const FallbackRender: FC<Props> = ({ error }) => {
  console.log(error);

  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div className="size-full min-h-520px flex-col-center gap-24px overflow-hidden">
      <div className="flex text-400px text-primary">
        <SvgIcon localIcon="service-error" />
      </div>
      <pre>{error.message}</pre>
    </div>
  );
};

export default FallbackRender;
