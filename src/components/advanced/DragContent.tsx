import { Checkbox } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import type { OnDragEndResponder } from 'react-beautiful-dnd';
import type { FC } from 'react';

interface Props {
  columns: AntDesign.TableColumnCheck[];
  setColumnChecks: (checks: AntDesign.TableColumnCheck[]) => void;
}

const reorder = (list: AntDesign.TableColumnCheck[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  result[startIndex] = list[endIndex];
  result[endIndex] = list[startIndex];
  return result;
};

const DragContent: FC<Props> = ({ columns, setColumnChecks }) => {
  const dragEnd: OnDragEndResponder = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(columns, result.source.index, result.destination.index);
    setColumnChecks(items);
  };

  const handleChange = (value: boolean, index: number) => {
    columns[index].checked = !value;
    setColumnChecks([...columns]);
  };

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Droppable droppableId="sortable-list">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columns.map((item, index) => (
              <Draggable
                key={item.key}
                draggableId={item.key}
                index={index}
              >
                {provider => (
                  <div
                    ref={provider.innerRef}
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                    className="h-36px flex-y-center rd-4px hover:(bg-primary bg-opacity-20)"
                  >
                    <IconMdiDrag className="mr-8px h-full cursor-move text-icon" />
                    <Checkbox
                      checked={item.checked}
                      onClick={() => handleChange(item.checked, index)}
                      className="none_draggable flex-1"
                    >
                      {item.title}
                    </Checkbox>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragContent;
