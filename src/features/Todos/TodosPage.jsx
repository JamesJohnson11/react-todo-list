import TodoList from "./TodoList/TodoList";
import TodoForm from "./TodoForm";
import { useState, useEffect } from "react";

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      setIsTodoListLoading(true);
      try {
        const params = new URLSearchParams({
          limit: 100,
        });
        const response = await fetch(`/api/tasks?${params}`, {
          method: "GET",
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          throw new Error("Unauthorized: Invalid or expired token.");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTodoList(data.tasks || []);
      } catch (error) {
        setError(`Error fetching todos: ${error.message}`);
      } finally {
        setIsTodoListLoading(false);
      }
    }

    if (token) {
      fetchTodos();
    }
  }, [token]);

  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((prevTodoList) => [newTodo, ...prevTodoList]);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title: todoTitle, isCompleted: false }),
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedTodo = await response.json();
      setTodoList((previousTodoList) =>
        previousTodoList.map((todo) =>
          todo.id === newTodo.id ? savedTodo : todo,
        ),
      );
    } catch (error) {
      setTodoList((prevTodoList) =>
        prevTodoList.filter((todo) => todo.id !== newTodo.id),
      );
      setError(`Error adding todo: ${error.message}`);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: true };
        }
        return todo;
      }),
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: true }),
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) => {
          if (todo.id === id) {
            return originalTodo;
          }
          return todo;
        }),
      );
      setError(`Error completing todo: ${error.message}`);
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }
      return todo;
    });
    setTodoList(updatedTodos);

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setTodoList((prevTodoList) =>
        prevTodoList.map((todo) => {
          if (todo.id === editedTodo.id) {
            return originalTodo;
          }
          return todo;
        }),
      );
      setError(`Error updating todo: ${error.message}`);
    }
  }

  return (
    <>
      {isTodoListLoading && (
        <p>Loading your todo list...</p>
      )}
      {error && (
        <div role="alert" style={{ color: "red", marginBottom: "1rem" }}>
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)}>
            Clear Error
          </button>
        </div>
      )}
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </>
  );
}

export default TodosPage;
