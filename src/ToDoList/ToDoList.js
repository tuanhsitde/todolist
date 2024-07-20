import React, { Component } from "react";
import { Container } from "./components/Container";
import { ThemeProvider } from "styled-components";
import { DarkThemeToDoList } from "./Themes/DarkThemeToDoList";
import { LightThemeToDoList } from "./Themes/LightThemeToDoList";
import { Dropdown } from "./components/Dropdown";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "./components/Heading";
import { TextField } from "./components/TextField";
import { Button } from "./components/Button";
import { Table, Thead, Tbody, Tr, Td, Th } from "./components/Table";
import { ToDoListLightTheme } from "./Themes/ToDoListLightTheme";
import { connect } from "react-redux";
import {
  addTaskAction,
  changeThemeAction,
} from "../redux/actions/ToDoListAction";
import { ThemesManager } from "./Themes/ThemesManager";

class ToDoList extends Component {
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr ket={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-end">
              <Button>
                <i className="fa-solid fa-pen-to-square"></i>
              </Button>
              <Button>
                <i className="fa-solid fa-trash-can"></i>
              </Button>
              <Button>
                <i className="fa-solid fa-circle-check"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr ket={index}>
            <Th>{task.taskName}</Th>
            <Th className="text-end">
              <Button>
                <i className="fa-solid fa-trash-can"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  state = {
    taskName: "",
  };
  renderSelectTheme = () => {
    return ThemesManager.map((theme, index) => {
      return (
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
    });
  };
  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              // dispatch
              this.props.dispatch(changeThemeAction(value));
            }}
          >
            {this.renderSelectTheme()}
          </Dropdown>
          <Heading3>TO DO LIST</Heading3>
          <TextField
            label="Task name"
            name="taskName"
            onChange={(event) => {
              this.setState({
                taskName: event.target.value,
              });
            }}
          ></TextField>
          <Button
            onClick={() => {
              let { taskName } = this.state;
              let newTask = {
                id: Date.now(),
                taskName: this.state.taskName,
                done: false,
              };
              this.props.dispatch(addTaskAction(newTask));
            }}
          >
            {" "}
            + Add task
          </Button>
          <Button>
            {" "}
            <i class="fa-solid fa-upload"></i>Update task
          </Button>
          <hr />
          <Heading4>Task to do</Heading4>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>
          <Heading4>Task Complete</Heading4>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
  };
};
export default connect(mapStateToProps)(ToDoList);
