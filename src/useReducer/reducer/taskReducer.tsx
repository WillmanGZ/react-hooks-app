import * as z from "zod/v4";

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

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateScheme = z.object({
  todos: z.array(TodoSchema),
  lenght: z.number(),
  completed: z.number(),
  pending: z.number(),
});

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

  // Validate using Zod
  const result = TaskStateScheme.safeParse(JSON.parse(savedTodos));

  if (result.error) {
    return {
      todos: [],
      lenght: 0,
      completed: 0,
      pending: 0,
    };
  }

  return result.data;
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
