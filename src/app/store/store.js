import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import rootSaga from "../sagas/task-saga";
import { TaskReducer } from "../reducers/task-reducer";

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(TaskReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

export default store;
