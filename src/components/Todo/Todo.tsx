import React, { useContext } from "react";

import { TodoContext, ACTIONS, TodoContextInterface } from "../../App";

import styles from "./Todo.module.scss";

interface TodoProps {
  id: number;
  name: string;
  completed: boolean;
}

export default function Todo(props: TodoProps) {
  const { dispatch } = useContext(TodoContext) as TodoContextInterface;

  return (
    <div className={styles.Todo}>
      <span style={{ textDecoration: props.completed ? "line-through" : "" }}>
        {props.name}
      </span>
      <span className={styles.Completed}>
        Complete:{" "}
        <input
          type="checkbox"
          checked={props.completed}
          onChange={() =>
            dispatch({
              type: ACTIONS.COMPLETE_TODO,
              payload: { name: props.name, id: props.id },
            })
          }
        />
      </span>
      <button
        style={{ float: "left", marginRight: "1em" }}
        onClick={() => {
          dispatch({
            type: ACTIONS.REMOVE_TODO,
            payload: { name: props.name, id: props.id },
          });
        }}
      >
        X
      </button>
    </div>
  );
}
