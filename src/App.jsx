import "./App.css";
import TodoList from "./features/TodoList/TodoList";
import TodoForm from "./features/TodoForm";
import { useState } from "react";

function App() {
  const username = "Barry";
  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    }

    setTodoList((prevTodoList) => [ newTodo, ...prevTodoList]);
  }

  function completeTodo(id) {
    setTodoList((prevTodoList) => prevTodoList.map((todo) => {
      if (todo.id === id) {
        return {...todo, isCompleted: true};
      }
      return todo;
    }));
  }

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return {...editedTodo};
      }
      return todo;
    });
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>{username}'s Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
    </div>
  );
}

export default App;
