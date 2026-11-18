import "./App.css";
import TodoPage from "./features/Todos/TodoPage";
import Header from "./shared/Header";
import Logon from "./features/Logon";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  return (
    <>
      <Header token={token} onSetToken={setToken} onSetEmail={setEmail} />
      {token ? (
        <TodoPage />
      ) : (
        <Logon onSetEmail={setEmail} onSetToken={setToken} />
      )}
    </>
  );
}

export default App;
