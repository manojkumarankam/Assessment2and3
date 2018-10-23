import { TaskConstants } from "../constants/task-constant";

const getAction = () => ({
  type: TaskConstants.GETTASK_REQUEST
});

const createAction = title => {
  return {
    type: TaskConstants.CREATETASK_REQUEST,
    title: title
  };
};

const editAction = id => ({
  type: TaskConstants.EDITTASK_REQUEST,
  id: id
});

const updateAction = model => ({
  type: TaskConstants.UPDATETASK_REQUEST,
  model: model
});

const deleteAction = id => ({
  type: TaskConstants.DELETETASK_REQUEST,
  id: id
});

const completeAction = id => ({
  type: TaskConstants.COMPLETETASK_REQUEST,
  id: id
});

export {
  getAction,
  createAction,
  editAction,
  updateAction,
  deleteAction,
  completeAction
};
