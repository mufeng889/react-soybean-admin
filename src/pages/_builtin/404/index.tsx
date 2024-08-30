import ExceptionBase from '@/components/stateless/common/ExceptionBase';

export function Component() {
  return <ExceptionBase type="404" />;
}

Component.displayName = 'NotFound';
