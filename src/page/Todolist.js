import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllTask, deleteAllTasks } from "../api/apiManage";
import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import { logError } from "../util/UtilFunction";
import { toast } from "react-toastify";

const Todolist = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getAllTask()
      .then((response) => {
        setTasks(response);
      })
      .catch((err) => logError(err));

    return () => {};
  }, []);

  const handleDeleteAllBtn = () => {
    deleteAllTasks()
      .then(() => {
        setTasks([]);
        toast.success("Successfully removed all tasks!", { theme: "colored" });
      })
      .catch((err) => logError(err));
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#E5E5E5]">
      <div className="flex flex-col justify-between h-403 w-267 bg-white rounded-xl">
        <div className="flex justify-between p-5">
          <div>
            <h1 className="text-2xl font-[Roboto] font-medium text-[#6FC5A6]">
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
              className="h-5 w-5 text-[#FF7575]"
              icon="fa-solid fa-eraser"
            />
          </button>
        </div>
        <TaskList tasks={tasks} setTasks={setTasks} />
        <TaskInput tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default Todolist;
