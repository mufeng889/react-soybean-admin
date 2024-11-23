import BaseLayout from './BaseLayout';
import MenuProvider from './MenuProvider';

export function Component() {
  return (
    <MenuProvider>
      <BaseLayout />
    </MenuProvider>
  );
}
