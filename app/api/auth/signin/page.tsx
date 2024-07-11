"use client";

import {  signIn } from "next-auth/react";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

import styles from "./page.module.css";
interface SignInProps {
  providers: any;
}

const SignIn = ({ providers }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <h1>Sign in</h1>
        <form onSubmit={handleSignIn}>
          <div className={styles.formControl}>
            <FloatLabel>
              <InputText
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </FloatLabel>
          </div>
          <div className={styles.formControl}>
            <FloatLabel>
              <InputText
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <label htmlFor="password">Password</label>
            </FloatLabel>
          </div>
          <button className={styles.submitBtn} type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
