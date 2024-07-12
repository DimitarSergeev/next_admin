"use client";
import PageHeader from "@/app/components/utils/PageHeader";

import { InputText } from "primereact/inputtext";
import { FilePond } from "react-filepond";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function CreateUser() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [files, setFiles] = useState([]);

  const handleUserData = (key: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("file", files[0].file);

    const res = await fetch("/api/users/create", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const newUser = await res.json();
      router.push(`/users/edit/${newUser.id}`);
    } else {
      console.error("Failed to create user");
    }
  };
  return (
    <section className="custom-section">
      <PageHeader title="Create User" linkText="Back to Users" />
      <div className={styles.formWrapper}>
        <form
          className={styles.container}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
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
            {/* <CustomFileUpload /> */}
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxFiles={1}
              // server="/api"
              name="files"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <div className={styles.columSpanFull}>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </section>
  );
}
