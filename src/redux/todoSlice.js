import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAPI = createAsyncThunk("todos/getTodosAPI", async () => {
  const res = await fetch("http://localhost:9000/todos");
  if (res.ok) {
    const todos = await res.json();
    return { todos };
  }
});

export const deleteTodoAPI = createAsyncThunk(
  "todos/deleteTodoAPI",
  async (payload) => {
    const res = await fetch(`http://localhost:9000/todos/${payload.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const todo = await res.json();
      return { id: payload.id };
    }
  }
);

export const changeStatusTodoAPI = createAsyncThunk(
  "todos/changeStatusTodoAPI",
  async (payload) => {
    const res = await fetch(`http://localhost:9000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });
    if (res.ok) {
      const todo = await res.json();
      return { todo };
    }
  }
);

export const addTodoAPI = createAsyncThunk(
  "todos/addTodoAPI",
  async (payload) => {
    const res = await fetch(`http://localhost:9000/todos/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });
    if (res.ok) {
      const todo = await res.json();
      return { todo };
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    // { id: 1, title: "The first todo", completed: false },
    // { id: 2, title: "The second todo", completed: true },
    // { id: 3, title: "The third todo", completed: false },
  ],
  reducers: {
    addTodo: (state, action) => {
      const todoItem = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(todoItem);
    },
    deleteTodo: (state, action) => {
      const id = action.payload.id;
      return state.filter((el) => el.id !== id);
      // state.push();
    },
    changeTodoStatus: (state, action) => {
      const id = action.payload.id;
      const completed = action.payload.completed;
      // state.filter((el) => {
      //   if (el.id == id) {
      //     return (el.completed = !completed);
      //   }
      // });
      // return state;
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = !action.payload.completed;
      // state.push();
    },
  },
  extraReducers: {
    [getTodosAPI.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [deleteTodoAPI.fulfilled]: (state, action) => {
      const id = action.payload.id;
      return state.filter((el) => el.id !== id);
    },
    [changeStatusTodoAPI.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload.todo.id
      );
      state[index].completed = !action.payload.todo.completed;
    },
    [addTodoAPI.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, deleteTodo, changeTodoStatus } = todoSlice.actions;
