import React from "react";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logError } from "../util/UtilFunction";
import { deleteAllTasks } from "../api/apiManage";
import { toast } from "react-toastify";

const Container = tw.div`flex justify-between p-5`;

const TasklistHeader = (props) => {
  const { tasks, setTasks } = props;
  const handleDeleteAllBtn = () => {
    deleteAllTasks()
      .then(() => {
        setTasks([]);
        toast.success("Successfully removed all tasks!", { theme: "colored" });
      })
      .catch((err) => logError(err));
  };
  return (
    <Container>
      <div>
        <h1 className="text-2xl font-[Roboto] font-medium text-[#6FC5A6]">
          TODAY
        </h1>
        <p className="text-xs font-medium font-[Roboto] leading-3">
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
    </Container>
  );
};

export default TasklistHeader;
