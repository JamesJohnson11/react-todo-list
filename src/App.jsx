import './App.css'

function App() {
  const username = "Barry";
  const todoList = [
    { id: 1, title: "Breakdown User Stories" },
    { id: 2, title: "Update Task Estimates" },
    { id: 3, title: "Add my tasks to current sprint" }
  ];

  return (
    <div>
      <h1>{username}'s Todo List</h1>
      <ul>
        {todoList.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  )
}

export default App
