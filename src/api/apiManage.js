import axios from "axios";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
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

  await axios.get("cookie/");

  const csrftoken = getCookie("csrftoken");

  const config = {
    headers: { "X-CSRFToken": csrftoken },
  };

  const response = await axios.post("/api/task/", taskObj, config);

  return response.data;
};

export const deleteTask = async (id) => {
  await axios.get("cookie/");

  const csrftoken = getCookie("csrftoken");

  const config = {
    headers: { "X-CSRFToken": csrftoken },
  };

  const response = await axios.delete(`/api/task/${id}/`, config);

  return response.data;
};

export const updateTask = async (task) => {
  await axios.get("/cookie");

  const csrftoken = getCookie("csrftoken");

  const config = {
    headers: { "X-CSRFToken": csrftoken },
  };

  const response = await axios.patch(`/api/task/${task.id}/`, task, config);

  return response.data;
};

export const deleteAllTasks = async () => {
  await axios.get("/cookie");

  const csrftoken = getCookie("csrftoken");

  const config = {
    headers: { "X-CSRFToken": csrftoken },
  };

  const response = await axios.delete(`/api/task/delete_all/`, config);

  return response.data;
};
