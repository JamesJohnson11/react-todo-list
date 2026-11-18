import { useState } from "react";

function Logon({ onSetEmail = () => {}, onSetToken = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoggingOn(true);

    try {
      const response = await fetch("/api/users/logon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      if (response.status === 200 && data.email && data.csrfToken) {
        onSetEmail(data.email);
        onSetToken(data.csrfToken);
      } else {
        setAuthError(`Authentication failed: ${data?.message}`);
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <div>
      <h2>Logon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {authError && <p style={{ color: "red" }}>{authError}</p>}
        <button type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default Logon;
