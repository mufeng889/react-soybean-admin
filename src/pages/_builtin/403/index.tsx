import ExceptionBase from '@/components/stateless/common/ExceptionBase';

export function Component() {
  return <ExceptionBase type="403" />;
}

Component.displayName = 'NotAuth';
