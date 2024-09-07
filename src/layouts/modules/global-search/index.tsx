import { useBoolean } from 'ahooks';
import { Suspense } from 'react';

const SearchModal = lazy(() => import('./components/SearchModal'));

const GlobalSearch = memo(() => {
  const { t } = useTranslation();

  const [show, { toggle, setFalse }] = useBoolean();

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
          onClose={setFalse}
          show={show}
        />
      </Suspense>
    </>
  );
});

export default GlobalSearch;
