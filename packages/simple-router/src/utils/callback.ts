/** Create a list of callbacks that can be reset. Used to create before and after navigation guards list */
export function callbacks<T>() {
  let handlers: T[] = [];

  function add(handler: T): () => void {
    console.log(222);

    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1) handlers.splice(i, 1);
    };
  }

  function reset() {
    handlers = [];
  }

  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
