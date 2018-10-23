import React from "react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { history } from "../history/history";
import {
  editAction,
  deleteAction,
  completeAction,
  updateAction
} from "../actions/task-action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class AddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        title: "",
        description: "",
        completed: false,
        id: 0
      }
    };
  }
  componentDidMount() {
    if (this.props.match.params.id)
      this.props.editAction(this.props.match.params.id);
  }
  componentWillReceiveProps(props) {
    const { task } = props;
    this.setState({
      task: task
    });
  }
  onHandleChange = event => {
    const { name, value } = event.target;
    const { task } = this.state;
    this.setState({
      task: {
        ...task,
        [name]: value
      }
    });
  };

  handleDelete(id) {
    this.props.deleteAction(id);
    history.push("/list");
  }

  saveTask = event => {
    const { task } = this.state;
    task.id = this.props.match.params.id;
    this.props.updateAction(task);
    history.push("/list");
  };

  render() {
    const { task } = this.state;
    return (
      <div>
        <Link to="/list">
          <b>Back to Tasks</b>
        </Link>{" "}
        <br />
        <TextField
          label="Title*"
          placeholder="Title*"
          name="title"
          value={task.title}
          onChange={this.onHandleChange}
        />
        <br />
        <TextField
          label="Description"
          placeholder="Description"
          name="description"
          value={task.description}
          onChange={this.onHandleChange}
        />
        <br />
        <div style={marTop}>
          <Button variant="contained" color="primary" onClick={this.saveTask}>
            Save
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              history.push("/list");
            }}
          >
            Cancel
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.handleDelete(this.props.match.params.id);
            }}
          >
            Delete
          </Button>
          &nbsp;
        </div>
      </div>
    );
  }
}

const marTop = {
  marginTop: "5px"
};

const mapDispatchtoProps = dispatch =>
  bindActionCreators(
    {
      editAction: editAction,
      updateAction: updateAction,
      deleteAction: deleteAction,
      completeAction: completeAction
    },
    dispatch
  );

function mapStateToProps(state) {
  const { task } = state;
  return {
    task
  };
}

const connectedTodoList = connect(
  mapStateToProps,
  mapDispatchtoProps
)(AddEdit);

export { connectedTodoList as AddEdit };
