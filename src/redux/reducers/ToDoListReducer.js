import { DarkThemeToDoList } from "../../ToDoList/Themes/DarkThemeToDoList";
import { add_task, change_theme } from "../types/ToDoListType";
import { ToDoListLightTheme } from "../../ToDoList/Themes/ToDoListLightTheme";
import { ToDoListDarkTheme } from "../../ToDoList/Themes/ToDoListDarkTheme";
import { ToDoListPrimaryTheme } from "../../ToDoList/Themes/ToDoListPrimaryTheme";
import { ThemesManager } from "../../ToDoList/Themes/ThemesManager";
import { Th } from "../../ToDoList/components/Table";

const initialState = {
  themeToDoList: ToDoListPrimaryTheme,
  taskList: [
    {
      id: "task-1",
      taskName: "task 1",
      done: true,
    },
    {
      id: "task-1",
      taskName: "task 1",
      done: false,
    },
    {
      id: "task-1",
      taskName: "task 1",
      done: true,
    },
  ],
};
export default function ToDoListReducer(state = initialState, action) {
  switch (action.type) {
    case add_task:
      //kiem tra rong
      if (action.newTask.taskName.trim() === "") {
        return { ...state };
      }
      // kiem tra ton tai
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName,
      );
      if (index !== -1) {
        alert("task name already exist");
      }
      taskListUpdate = [...state.taskList, action.newTask];

      state.taskList = taskListUpdate;
      return { ...state };
    case change_theme:
      console.log(action.themeId);
      console.log(ThemesManager);
      let theme = ThemesManager.find((theme) => theme.id === action.themeId);
      console.log(theme);
      if (theme) {
        state.themeToDoList = { ...theme.theme };
      }
      return { ...state };
    default:
      return { ...state };
  }
}
