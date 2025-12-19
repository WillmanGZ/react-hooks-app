interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  lenght: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

export const getTasksInitialState = (): TaskState => {
  const savedTodos = localStorage.getItem("tasks-state");

  if (!savedTodos) {
    return {
      todos: [],
      lenght: 0,
      completed: 0,
      pending: 0,
    };
  }

  return JSON.parse(savedTodos);
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      const updatedTodos = [...state.todos, newTodo];

      const completedTodos = updatedTodos.filter((todo) => todo.completed);

      const pendingTodos = updatedTodos.filter((todo) => !todo.completed);

      return {
        todos: updatedTodos,
        lenght: updatedTodos.length,
        completed: completedTodos.length,
        pending: pendingTodos.length,
      };
    }

    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

      const completedTodos = updatedTodos.filter((todo) => todo.completed);

      const pendingTodos = updatedTodos.filter((todo) => !todo.completed);

      return {
        todos: updatedTodos,
        lenght: updatedTodos.length,
        completed: completedTodos.length,
        pending: pendingTodos.length,
      };
    }

    case "DELETE_TODO": {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id != action.payload
      );

      const completedTodos = updatedTodos.filter((todo) => todo.completed);

      const pendingTodos = updatedTodos.filter((todo) => !todo.completed);

      return {
        todos: updatedTodos,
        lenght: updatedTodos.length,
        completed: completedTodos.length,
        pending: pendingTodos.length,
      };
    }

    default:
      return state;
  }
};
