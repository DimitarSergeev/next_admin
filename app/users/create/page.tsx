"use client";
import PageHeader from "@/app/components/utils/PageHeader";

import { InputText } from "primereact/inputtext";

import styles from "./page.module.css";
import { useState } from "react";
import CustomFileUpload from "@/app/components/utils/FileUpload";
export default function CreateUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleUserData = (key: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section className="custom-section">
      <PageHeader title="Create User" linkText="Back to Users" />
      <div className={styles.formWrapper}>
        <form className={styles.container} autoComplete="off">
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              onChange={(e) => handleUserData("name", e.target.value)}
              value={userData.name}
              autoComplete="new-name"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              aria-describedby="email-help"
              onChange={(e) => handleUserData("email", e.target.value)}
              value={userData.email}
              autoComplete="new-email"
            />
            <small id="email-help">
              With email, you can login to your account.
            </small>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password</label>
            <InputText
              id="password"
              type="password"
              onChange={(e) => handleUserData("password", e.target.value)}
              value={userData.password}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Image</label>
            <CustomFileUpload />
          </div>
          <div className={styles.columSpanFull}>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </section>
  );
}
