"use client";
import PageHeader from "@/app/components/utils/PageHeader";
import { InputText } from "primereact/inputtext";
import { FilePond } from "react-filepond";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import styles from "./page.module.css";

export default function EditPage() {
  const router = useRouter();
  const { id } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [files, setFiles] = useState([]);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users/edit/${id}`, { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          setUserData({
            name: data.name,
            email: data.email,
            password: "",
            image: data.image,
          });
          
         if (data.image) {
           const imageUrl = `${window.location.origin}${data.image}`;
           const response = await fetch(imageUrl);
           const blob = await response.blob();
           const file = new File(
             [blob],
             data.image.split("/").pop() || "image.jpg",
             { type: blob.type }
           );

           // Preload the image in FilePond
           setFiles([{ source: file, options: { type: "local" } }]);
         }
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        toast.error("An error occurred while fetching user data");
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

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
    if (userData.password) {
      formData.append("password", userData.password);
    }
    if (files.length > 0) {
      formData.append("file", files[0]?.file);
    }

    try {
      const res = await fetch(`/api/users/edit/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.ok) {
        const response = await res.json();
        if (response.success) {
          toast.success("User updated successfully");
          router.push(`/users/edit/${response.user_id}`);
        } else {
          toast.error(response.message);
        }
      } 
    } catch (error) {
      toast.error("An error occurred while updating user data");
    }
  };
  
  return (
    <section className="custom-section">
      <PageHeader title="Edit User" linkText="Back to Users" />
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
            <label htmlFor="file">Image</label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFiles={1}
              name="file"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <div className={`${styles.columSpanFull} ${styles.btnCont}`}>
            <Button
              label={"Update"}
              className="p-button-primary"
              raised
              type="submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
