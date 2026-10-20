import "./App.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";

const todos = [
    { id: 1, title: "Breakdown User Stories" },
    { id: 2, title: "Update Task Estimates" },
    { id: 3, title: "Add my tasks to current sprint" },
  ];

function App() {
  const username = "Barry";
  const [todoList, setTodoList] = useState(todos);

  return (
    <div>
      <h1>{username}'s Todo List</h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
