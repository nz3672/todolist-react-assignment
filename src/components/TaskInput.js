import React, { useState } from "react";
import tw from "twin.macro";
import { addTask } from "../api/apiManage";
import { logError } from "../util/UtilFunction";

const InputContainer = tw.div`flex w-full h-51 bg-[#F2F2F2] rounded-b-xl px-2.5 justify-between items-center`;

const TaskInput = (props) => {
  const { tasks, setTasks } = props;
  const [taskInput, setTaskInput] = useState("");

  const onChange = (e) => {
    setTaskInput(e.target.value);
  };

  const onSubmit = (e) => {
    addTask(taskInput)
      .then((response) => {
        setTasks([...tasks, response]);
        setTaskInput("");
      })
      .catch((err) => {
        logError(err);
      });
  };
  return (
    <InputContainer>
      <input
        className="bg-transparent focus:outline-none font-[Roboto] font-medium text-sm px-2.5"
        placeholder="What we have to do?"
        onChange={onChange}
        value={taskInput}></input>
      <button
        onClick={() => onSubmit()}
        className="text-[#6FC5A6] font-[Roboto] font-medium">
        Add
      </button>
    </InputContainer>
  );
};

export default TaskInput;
