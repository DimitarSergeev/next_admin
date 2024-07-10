"use client";
// pages/login.js
import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./page.module.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("result", result);
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
