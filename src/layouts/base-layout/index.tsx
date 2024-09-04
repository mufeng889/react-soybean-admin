import MenuProvider from './MenuProvider';
import BaseLayout from './BaseLayout';

export function Component() {
  return (
    <MenuProvider>
      <BaseLayout />
    </MenuProvider>
  );
}
