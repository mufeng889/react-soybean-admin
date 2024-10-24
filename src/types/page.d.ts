declare namespace Page {
  type FormInstance = import('antd').FormInstance;

  interface SearchProps {
    reset: () => void;
    search: () => void;
    form: FormInstance;
  }

  interface OperateDrawerProps {
    open: boolean;
    onClose: () => void;
    handleSubmit: () => void;
    form: FormInstance;
    operateType: AntDesign.TableOperateType;
  }
}
