function TodoList() {
  const todoList = [
    { id: 1, title: "Breakdown User Stories" },
    { id: 2, title: "Update Task Estimates" },
    { id: 3, title: "Add my tasks to current sprint" },
  ];

  return (
    <>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
