import { AppState } from "./types";

export function initialState(): AppState {
    return {
      time: 60 * 25,
      totalMins : 25,
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
          taskOrder: [5],
        },
        4: {
          name: "Empty",
          taskOrder: [],
        },
      },
      tasks: {
        0: {
          value: "Task 1",
          points: 1,
        },
        1: {
          value: "Task 2",
          points: 2,
        },
        2: {
          value: "Task 3",
          points: 3,
        },
        3: {
          value: "Task 4",
          points: 4,
        },
        4: {
          value: "Task 5",
          points: 5,
        },
        5: {
          value: "Task 6",
          points: 6,
        },
      },
      selectedTask: null,
    };
  }
  
  export function shellState(): AppState {
    return {
      time: 60 * 25,
      totalMins : 25,
      clockType: "work",
      clockStatus: "stopped",
      listOrder: [],
      lists: {},
      tasks: {},
      selectedTask: null,
    };
  }