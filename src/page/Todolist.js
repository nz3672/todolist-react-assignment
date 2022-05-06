import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { getAllTask } from "../api/apiManage";
import TaskList from "../components/TaskList";
import TaskInput from "../components/TaskInput";
import { logError } from "../util/UtilFunction";
import TasklistHeader from "../components/TasklistHeader";

const Container = tw.div`flex justify-center items-center w-screen h-screen bg-[#E5E5E5]`;

const TodoListContainer = tw.div`flex flex-col justify-between h-403 w-267 bg-white rounded-xl`;

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

  return (
    <Container>
      <TodoListContainer>
        <TasklistHeader tasks={tasks} setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
        <TaskInput tasks={tasks} setTasks={setTasks} />
      </TodoListContainer>
    </Container>
  );
};

export default Todolist;
