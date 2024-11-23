import DarkModeContainer from '@/components/stateless/common/DarkModeContainer';

const GlobalFooter = memo(() => {
  return (
    <DarkModeContainer className="h-full flex-center">
      <a
        href="https://github.com/honghuangdc/soybean-admin/blob/main/LICENSE"
        rel="noopener noreferrer"
        target="_blank"
      >
        Copyright MIT © 2021 Soybean
      </a>
    </DarkModeContainer>
  );
});

export default GlobalFooter;
