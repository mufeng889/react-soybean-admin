import { getIsMobile } from '@/store/slice/app';

export function useGetElementById(id: string) {
  const [container, setContainers] = useState<HTMLElement | null>();

  const isMobile = useAppSelector(getIsMobile);

  useEffect(() => {
    const element = document.getElementById(id);

    setContainers(element);
  }, [isMobile]);

  return container;
}
