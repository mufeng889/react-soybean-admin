export function useGetElementById(id: string) {
  const [container, setContainers] = useState<HTMLElement | null>();

  useEffect(() => {
    const element = document.getElementById(id);

    setContainers(element);
  }, []);

  return container;
}
