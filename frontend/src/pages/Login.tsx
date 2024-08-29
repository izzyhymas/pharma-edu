import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../assets/DixieTechLogo_Artboard-13.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.outer}>
        <img src={logo} alt="login-logo" className={styles.logo}></img>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <h2>Sign in</h2>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <p>Username:</p>
              <input
                type="text"
                placeholder="Enter username"
                className={styles.inputField}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p>Password:</p>
              <input
                type="text"
                placeholder="Enter password"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
