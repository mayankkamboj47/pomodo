import { AppState } from "./types";

export function initialState(): AppState {
  return {
    time: 60 * 25,
    totalMins: 25,
    clockType: "work",
    clockStatus: "stopped",
    listOrder: [2, 1, 3, 0, 4],
    lists: {
      0: {
        name: "To Do",
        taskOrder: [0, 1, 2],
      },
      1: {
        name: "Doing",
        taskOrder: [3],
      },
      2: {
        name: "Done",
        taskOrder: [4],
      },
      3: {
        name: "Blocked",
        taskOrder: [5, 6],
      },
      4: {
        name: "Empty",
        taskOrder: [],
      },
    },
    tasks: {
      0: {
        value: notes[0],
        points: 1,
      },
      1: {
        value: notes[1],
        points: 2,
      },
      2: {
        value:
          "You can drag and drop the tasks and lists",
        points: 3,
      },
      3: {
        value:
          "1. Click on a task. It will get selected\n" +
          "1. Pick how long you would like to work using the clock, and hit start\n",
        points: 4,
      },
      4: {
        value: notes[2],
        points: 5,
      },
      5: {
        value:
          "The black '+' button adds a list, and the + button inside the list adds a task",
        points: 6,
      },
      6: {
        value:"Code for this project is on [Github](https://www.github.com/mayankkamboj47/pomodo)",
        points: 0
      }
    },
    selectedTask: null,
  };
}

export function shellState(): AppState {
  return {
    time: 60 * 25,
    totalMins: 25,
    clockType: "work",
    clockStatus: "stopped",
    listOrder: [],
    lists: {},
    tasks: {},
    selectedTask: null,
  };
}

const notes = [`# You can add _Markdown_ to your tasks`, 
`__Double click__ this item to edit`, 
`You get __points__ for spending time on tasks!
1. For each 1 minute, you get 🍬
1. For each 5 minutes, you get 🍭
1. For each 15 minutes, you get 🍫
1. For each 25 minutes, you get 🍩
`];
