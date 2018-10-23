import React from "react";
import { TextField, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { history } from "../history/history";
import {
  getAction,
  deleteAction,
  completeAction,
  createAction
} from "../actions/task-action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      task: {
        title: ""
      }
    };
  }
  onHandleChange = event => {
    debugger;
    const { name, value } = event.target;
    const { task } = this.state;
    this.setState({
      task: {
        ...task,
        [name]: value
      }
    });
  };

  componentDidMount() {
    this.props.getAction();
  }
  deleteTask(id) {
    this.props.deleteAction(id);
  }
  complateTask(id) {
    this.props.completeAction(id);
  }

  saveTask = event => {
    const { task } = this.state;
    this.props.createAction(task.title);
    history.push("/list");
  };
  render() {
    const { task } = this.state;
    const { tasks } = this.props;
    return (
      <div style={dvBorder}>
        <b>TO-DO:</b>
        <br />
        <TextField
          label="Title*"
          placeholder="Title*"
          name="title"
          value={task.title}
          onChange={this.onHandleChange}
        />
        <Button variant="contained" color="primary" onClick={this.saveTask}>
          Add new To:do
        </Button>
        <br />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title </TableCell>
              <TableCell>Description </TableCell>
              <TableCell> Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!tasks && (
              <TableRow>
                <TableCell />
              </TableRow>
            )}
            {tasks &&
              tasks.map((o, i) => (
                <TableRow key={i}>
                  <TableCell
                    className={o.completed === true ? "strike" : "no-style"}
                  >
                    <a
                      onClick={() => {
                        history.push("/add-edit/" + o.id);
                      }}
                    >
                      {o.title}{" "}
                    </a>
                  </TableCell>
                  <TableCell>{o.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="default"
                      disabled={o.completed}
                      onClick={() => {
                        this.deleteTask(o.id);
                      }}
                    >
                      X
                    </Button>{" "}
                    &nbsp;
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={o.completed}
                      onClick={() => {
                        this.complateTask(o.id);
                      }}
                    >
                      Complete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
const dvBorder = {
  border: "1px solid lightgray",
  marginLeft: "60px",
  marginRight: "60px",
  marginTop: "5px"
};

const mapDispatchtoProps = dispatch =>
  bindActionCreators(
    {
      getAction: getAction,
      createAction: createAction,
      deleteAction: deleteAction,
      completeAction: completeAction
    },
    dispatch
  );

function mapStateToProps(state) {
  const { tasks } = state;
  return {
    tasks
  };
}

const connectedTodoList = connect(
  mapStateToProps,
  mapDispatchtoProps
)(List);
export { connectedTodoList as List };
