import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllTask, addTask, deleteAllTasks } from "../api/apiManage";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Todolist = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  useEffect(() => {
    getAllTask().then((response) => {
      setTasks(response);
    });

    return () => {};
  }, []);
  const onChange = (e) => {
    setTaskInput(e.target.value);
  };

  const onSubmit = (e) => {
    addTask(taskInput)
      .then((response) => {
        setTasks([...tasks, response]);
        setTaskInput("");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteAllBtn = () => {
    deleteAllTasks()
      .then((response) => setTasks([]))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-300">
      <div className="flex flex-col justify-between h-403 w-267 bg-white rounded-xl">
        <div className="p-5">
          <div className="flex justify-between mb-7">
            <div>
              <h1 className="text-2xl font-[Roboto] font-medium text-emerald-500">
                TODAY
              </h1>
              <p className="text-sm font-medium leading-3">
                <i>{tasks.length} Tasks</i>
              </p>
            </div>
            <button
              className="self-start leading-8"
              onClick={() => handleDeleteAllBtn()}>
              <FontAwesomeIcon
                className="h-5 w-5 text-rose-500"
                icon="fa-solid fa-eraser"
              />
            </button>
          </div>
          <DragDropContext>
            <Droppable droppableId="droppable-1">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}>
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          key={index}
                          onDragStart={(e) => {}}>
                          <Task task={item} tasks={tasks} setTasks={setTasks} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="flex w-full h-51 bg-zinc-100 rounded-b-xl px-2.5 justify-between items-center">
          <input
            className="bg-transparent focus:outline-none"
            placeholder="What we have to do?"
            onChange={onChange}
            value={taskInput}></input>
          <button onClick={() => onSubmit()} className="text-emerald-500">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
