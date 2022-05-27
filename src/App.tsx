import React, { useState, useReducer, Reducer } from "react";
import "./App.css";

import TodoComponent from "./components/Todo/Todo";

import styles from "./App.module.scss";

const initialState = {
  todos: [],
};

export interface TodoContextInterface {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

export const TodoContext = React.createContext<TodoContextInterface | null>({
  state: initialState,
  dispatch: () => true,
});

export const ACTIONS = {
  ADD_TODO: "add-todo",
  REMOVE_TODO: "remove-todo",
  COMPLETE_TODO: "complete-todo",
};

type Todo = {
  name: string;
  id: number;
  completed: boolean;
};

type TodoState = {
  todos: Todo[] | [];
};

type TodoAction = {
  type: string;
  payload: {
    id: number;
    name: string;
  };
};

const reducer: Reducer<TodoState, TodoAction> = (
  state: TodoState,
  action: TodoAction
) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        todos: [
          ...state.todos,
          newTodo(action.payload.name, action.payload.id),
        ],
      };
    case ACTIONS.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case ACTIONS.COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };
    default:
      return state;
  }
};

function newTodo(name: string, id: number) {
  return {
    id,
    name: name,
    completed: false,
  };
}

function App() {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNewTodoName = (event: React.FormEvent<HTMLInputElement>) => {
    setId(Date.now());
    setName(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { id, name } });
    setId(0);
    setName("");
  };

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <h1>Eddie's Todo App with Typescript &amp; Hooks</h1>
        <div className={styles.todoForm}>
          <h3>Add a new todo:</h3>
          <form className={styles.newTodoForm} onSubmit={handleSubmit}>
            <label htmlFor="todoName">Name</label>
            <input
              type="text"
              name="todoName"
              value={name}
              onChange={handleNewTodoName}
            />

            <input type="submit" value="Add Todo" onClick={handleSubmit} />
          </form>
        </div>

        {state.todos.length > 0 && (
          <div className={styles.todoList}>
            {state.todos.map((todo) => {
              return (
                <TodoComponent
                  key={todo.id}
                  id={todo.id}
                  name={todo.name}
                  completed={todo.completed}
                />
              );
            })}
          </div>
        )}
      </div>
    </TodoContext.Provider>
  );
}

export default App;
