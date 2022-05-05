import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { deleteTask, updateTask } from "../api/apiManage";

const Task = (props) => {
  const { task, tasks, setTasks } = props;
  const [checked, setChecked] = useState(task.task_status);

  const handleDeleteBtn = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const onCheckboxChange = (e) => {
    const taskUpdate = task;
    taskUpdate.task_status = !checked;
    updateTask(taskUpdate)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    setChecked(!checked);
  };

  return (
    <div className="flex items-center p-1.5">
      <label className="flex cursor-pointer items-center relative">
        <input
          type="checkbox"
          className="appearance-none h-5 w-5 border-2 rounded-sm border-gray-300"
          id="check-box-1"
          onChange={onCheckboxChange}
          value={task.task_status}
          checked={checked}
        />
        <FontAwesomeIcon
          icon="fa-solid fa-check"
          className="absolute text-gray-300 h-3 w-3 top-1 left-1 text-opacity-0 check-1"
        />
        <p
          className={`inline mx-3 font-[Roboto] text-sm ${
            checked && "text-gray-300 line-through decoration-2"
          }`}>
          {task.task_info}
        </p>
      </label>

      {/* <input
        type="checkbox"
        checked={checked}
        onClick={() => {
          setChecked(!checked);
        }}
        value={task.task_status}
      /> */}

      <button
        className={`w-fit h-fit ${checked && "hidden"}`}
        onClick={() => handleDeleteBtn(task.id)}>
        <FontAwesomeIcon className="h-4 w-4" icon="fa-solid fa-x" />
      </button>
    </div>
  );
};

export default Task;
