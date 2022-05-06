import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { deleteTask, updateTask } from "../api/apiManage";
import { logError } from "../util/UtilFunction";

const Task = (props) => {
  const { task, tasks, setTasks } = props;
  const [checked, setChecked] = useState(task.task_status);

  useEffect(() => {
    setChecked(task.task_status);
  }, [task]);

  const handleDeleteBtn = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((err) => {
        logError(err);
      });
  };

  const onCheckboxChange = (e) => {
    const taskUpdate = task;
    taskUpdate.task_status = !checked;
    updateTask(taskUpdate).catch((err) => {
      logError(err);
    });
    setChecked(!checked);
  };

  return (
    <div className="flex items-center p-1.5 bg-white rounded-md">
      <label className="flex items-center relative">
        <input
          type="checkbox"
          className="appearance-none cursor-pointer h-5 w-5 border-2 rounded-sm border-[#BCBCBC]"
          id="check-box-1"
          onChange={onCheckboxChange}
          value={task.task_status}
          checked={checked}
        />
        <FontAwesomeIcon
          icon="fa-solid fa-check"
          className="absolute text-[#BCBCBC] h-3 w-3 top-1 left-1 text-opacity-0 check-1"
        />
        <p
          className={`inline mx-3 font-[Roboto] text-sm font-medium ${
            checked && "text-[#BCBCBC] line-through decoration-1"
          }`}>
          {task.task_info}
        </p>
      </label>

      <button
        className={`w-fit h-fit ${checked && "hidden"}`}
        onClick={() => handleDeleteBtn(task.id)}>
        <FontAwesomeIcon className="h-3.5 w-3.5" icon="fa-solid fa-x" />
      </button>
    </div>
  );
};

export default Task;
