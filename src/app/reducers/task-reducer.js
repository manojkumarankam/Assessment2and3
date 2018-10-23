import { TaskConstants } from "../constants/task-constant";

export function TaskReducer(state = {}, action) {
  debugger;
  switch (action.type) {
    case TaskConstants.GETTASK_REQUEST:
      return {
        ...state
      };

    case TaskConstants.GETTASK_SUCCESS:
      return {
        ...state,
        tasks: action.result
      };

    case TaskConstants.CREATETASK_REQUEST:
      return {
        ...state
      };

    case TaskConstants.CREATETASK_SUCCESS:
      return {
        ...state,
        tasks: action.result
      };

    case TaskConstants.EDITTASK_REQUEST:
      return {
        ...state
      };

    case TaskConstants.EDITTASK_SUCCESS:
      return {
        ...state,
        task: action.result
      };
    default:
      return state;
  }
}
