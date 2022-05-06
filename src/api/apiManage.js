import axios from "axios";

async function getCookie(name) {
  let cookieValue = null;
  if (!document.cookie.includes("csrftoken")) {
    await axios.get("cookie/");
  }
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const getAllTask = async () => {
  const response = await axios.get("/api/task/");

  return response.data;
};

export const addTask = async (task) => {
  const taskObj = {
    task_info: task,
    created_date: "2010-10-10",
    task_status: false,
  };

  const csrftoken = await getCookie("csrftoken");

  const config = {
    headers: { "X-CSRFToken": csrftoken },
  };

  const response = await axios.post("/api/task/", taskObj, config);

  return response.data;
};

export const deleteTask = async (id) => {
  const csrftoken = await getCookie("csrftoken");

  const config = {
    headers: { "X-CSRFToken": csrftoken },
  };

  const response = await axios.delete(`/api/task/${id}/`, config);

  return response.data;
};

export const updateTask = async (task) => {
  const csrftoken = await getCookie("csrftoken");

  const config = {
    headers: { "X-CSRFToken": csrftoken },
  };

  const response = await axios.patch(`/api/task/${task.id}/`, task, config);

  return response.data;
};

export const deleteAllTasks = async () => {
  const csrftoken = await getCookie("csrftoken");

  const config = {
    headers: { "X-CSRFToken": csrftoken },
  };

  const response = await axios.delete(`/api/task/delete_all/`, config);

  return response.data;
};

export const sortTasksByDnD = async (tasks) => {
  const csrftoken = await getCookie("csrftoken");

  const config = {
    headers: { "X-CSRFToken": csrftoken },
  };

  const response = await axios.put("/api/task/", tasks, config);

  return response.data;
};
