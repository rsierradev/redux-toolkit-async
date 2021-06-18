import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { getTodosAPI } from "../redux/todoSlice";

function TodoList() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getTodosAPI()), [dispatch]);

  const todos = useSelector((state) => state.todos);

  return (
    <ul>
      {todos.map((todoElement) => (
        <TodoItem
          key={todoElement.id}
          id={todoElement.id}
          title={todoElement.title}
          completed={todoElement.completed}
        />
      ))}
    </ul>
  );
}

export default TodoList;
