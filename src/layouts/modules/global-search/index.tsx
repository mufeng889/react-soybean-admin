import { useBoolean } from 'ahooks';
import { Suspense } from 'react';

const SearchModal = lazy(() => import('./components/SearchModal'));

const GlobalSearch = memo(() => {
  const { t } = useTranslation();

  const [show, { setFalse, toggle }] = useBoolean();

  return (
    <>
      <ButtonIcon
        className="px-12px"
        tooltipContent={t('common.search')}
        onClick={toggle}
      >
        <IconUilSearch />
      </ButtonIcon>
      <Suspense fallback={null}>
        <SearchModal
          show={show}
          onClose={setFalse}
        />
      </Suspense>
    </>
  );
});

export default GlobalSearch;
