import { put, all, takeLatest } from "redux-saga/effects";
import {
  getAllTasks,
  createTask,
  deleteTask,
  completeTask,
  updateTask
} from "../services/task-service";
import { TaskConstants } from "../constants/task-constant";

function* getTasks() {
  const result = yield getAllTasks().then(res => res);
  yield put({ type: TaskConstants.GETTASK_SUCCESS, result: result });
}

function* getTasksWatcher() {
  console.log(TaskConstants.GETTASK_REQUEST);
  yield takeLatest(TaskConstants.GETTASK_REQUEST, getTasks);
}

function* editTasks(model) {
  const result = yield getAllTasks().then(res => res);
  let sinGleRec = result.filter(function(item) {
    return parseInt(model.id) === parseInt(item.id);
  });
  yield put({ type: TaskConstants.EDITTASK_SUCCESS, result: sinGleRec[0] });
}

function* editTasksWatcher() {
  yield takeLatest(TaskConstants.EDITTASK_REQUEST, editTasks);
}

function* createTasks(model) {
  let req = { title: model.title };
  const result = yield createTask(req).then(res => res);
  yield put({ type: TaskConstants.CREATETASK_SUCCESS, result: result });
}

function* createTasksWatcher() {
  yield takeLatest(TaskConstants.CREATETASK_REQUEST, createTasks);
}

function* deleteTasks(model) {
  debugger;
  const result = yield deleteTask(model.id).then(res => res);
  yield put({ type: TaskConstants.GETTASK_REQUEST, result: result });
}

function* deleteTasksWatcher() {
  debugger;
  yield takeLatest(TaskConstants.DELETETASK_REQUEST, deleteTasks);
}

function* completeTasks(model) {
  const result = yield completeTask(model.id).then(res => res);
  yield put({ type: TaskConstants.GETTASK_REQUEST, result: result });
}

function* completeTasksWatcher() {
  yield takeLatest(TaskConstants.COMPLETETASK_REQUEST, completeTasks);
}

function* updateTasks(model) {
  const result = yield updateTask(model.model, model.model.id).then(res => res);
  yield put({ type: TaskConstants.UPDATETASK_SUCCESS, result: result });
}

function* updateTasksWatcher() {
  yield takeLatest(TaskConstants.UPDATETASK_REQUEST, updateTasks);
}

export default function* rootSaga() {
  yield all([
    getTasksWatcher(),
    editTasksWatcher(),
    createTasksWatcher(),
    completeTasksWatcher(),
    deleteTasksWatcher(),
    updateTasksWatcher()
  ]);
}
