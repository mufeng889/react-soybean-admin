declare namespace Page {
  type FormInstance = import('antd').FormInstance;

  interface SearchProps {
    reset: () => void;
    search: () => void;
    form: FormInstance;
  }
}
