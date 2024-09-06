import DarkModeContainer from '@/components/stateless/common/DarkModeContainer';

const GlobalFooter = memo(() => {
  return (
    <DarkModeContainer className="h-full flex-center">
      <a
        href="https://github.com/honghuangdc/soybean-admin/blob/main/LICENSE"
        target="_blank"
        rel="noopener noreferrer"
      >
        Copyright MIT © 2021 Soybean
      </a>
    </DarkModeContainer>
  );
});

export default GlobalFooter;
