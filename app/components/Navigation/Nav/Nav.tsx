"use client";
import styles from "./Nav.module.css";
import { LogoutButton } from "@/app/auth";
import { Avatar } from "primereact/avatar";
import { useState } from "react";
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <nav className={styles.navigation}>
      <div className={styles.user} onClick={toggleIsOpen}>
        <div className={styles.wrapper}>
          <Avatar image="/images/logo.jpg" size="normal" shape="circle" />
          <h3>Dimitar</h3>
        </div>
        <i className="fa-solid fa-arrow-down"></i>

        <ul
          className={`${styles.subItems} ${isOpen ? styles.show : ""}`}
        >
          <li>
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </li>
          <li>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
