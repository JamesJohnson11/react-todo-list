import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const username = "Barry";

  return (
    <div>
      <h1>{username}'s Todo List</h1>
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default App
