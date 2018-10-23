import fetch from "isomorphic-fetch";

let Api_Url = "https://practiceapi.devmountain.com/api/tasks";

const getAllTasks = () => {
  return fetch(Api_Url)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
};

const createTask = model => {
  let req = {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(model)
  };
  return fetch(Api_Url, req)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
};

const deleteTask = id => {
  let req = {
    method: "Delete"
  };
  return fetch(`${Api_Url}/${id}`, req)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
};
const completeTask = id => {
  let req = {
    method: "Put"
  };
  return fetch(`${Api_Url}/${id}`, req)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
};
const updateTask = (model, id) => {
  let req = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(model)
  };
  let url = `${Api_Url}/${id}`;
  return fetch(url, req)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
};
export { getAllTasks, createTask, deleteTask, completeTask, updateTask };
