import React from "react";
import Task from "../components/Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { sortTasksByDnD } from "../api/apiManage";
import { logError } from "../util/UtilFunction";

const TaskList = (props) => {
  const { tasks, setTasks } = props;

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newTasks = [...tasks];
    const originTasks = [...tasks];

    // re-order array
    newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, tasks[source.index]);

    // re-map id
    originTasks.map((item, index) => {
      return newTasks.splice(index, 1, { ...newTasks[index], id: item.id });
    });

    sortTasksByDnD(newTasks).catch((err) => {
      logError(err);
    });
    setTasks(newTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="px-5 grow overflow-y-auto overflow-x-none">
            {tasks.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}>
                {(provided, snapshot) => (
                  <li
                    key={item.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <Task
                      task={item}
                      tasks={tasks}
                      setTasks={setTasks}
                      isDragging={snapshot.isDragging}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
