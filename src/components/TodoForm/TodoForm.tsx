import React, { ChangeEvent, FormEvent, useState } from "react";

import styles from "./TodoForm.module.scss";

export default function TodoForm() {
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  const handleNewTodoName = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(event.currentTarget.value);
  };

  const handleNewTodoDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodoDescription(event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Submitted!");
  };

  return (
    <div className={styles.todoList}>
      <h3>Add a new todo:</h3>
      <form className={styles.newTodoForm}>
        <label htmlFor="todoName">Name</label>
        <input
          type="text"
          name="todoName"
          value={newTodoName}
          onChange={handleNewTodoName}
        />

        <label htmlFor="todoDescription">Description</label>
        <input
          type="text"
          name="todoDescription"
          value={newTodoDescription}
          onChange={handleNewTodoDescription}
        />
        <input type="submit" value="Add Todo" onClick={handleSubmit} />
      </form>
    </div>
  );
}
