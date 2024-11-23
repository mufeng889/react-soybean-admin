import { Checkbox } from 'antd';
import type { FC } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import type { OnDragEndResponder } from 'react-beautiful-dnd';

interface Props {
  readonly columns: AntDesign.TableColumnCheck[];
  readonly setColumnChecks: (checks: AntDesign.TableColumnCheck[]) => void;
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
                draggableId={item.key}
                index={index}
                key={item.key}
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
                      className="none_draggable flex-1"
                      onClick={() => handleChange(item.checked, index)}
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
