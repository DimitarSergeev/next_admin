"use client";
import styles from "./Nav.module.css";
import { LogoutButton } from "@/app/auth";
import { Avatar } from "primereact/avatar";
import { useState } from "react";
export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
   const toggleSearch = (value : boolean) => {
     setSearchOpen((prev) => value);
   };
  return (
    <nav className={styles.navigation}>
      <div className={styles.headerSearch}>
        <div className={`${styles.mainSearch}`}>
          <div
            className={`${styles.inputGroup} ${searchOpen ? styles.open : ""}`}
          >
            <span
              className="input-group-prepend search-close"
              onClick={() => toggleSearch(false)}
            >
              <i className="fa-solid fa-xmark" />
            </span>
            <input
              type="text"
              className={`${styles.formControl}`}
              placeholder="Enter Keyword"
            />
            <span
              className="input-group-append search-btn"
              onClick={() => toggleSearch(true)}
            >
              <i className="fa-solid fa-magnifying-glass" />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.user} onClick={toggleIsOpen}>
        <div className={styles.wrapper}>
          <Avatar image="/images/logo.jpg" size="normal" shape="circle" />
          <h3>Dimitar</h3>
        </div>
        <i className="fa-solid fa-arrow-down"></i>

        <ul className={`${styles.subItems} ${isOpen ? styles.show : ""}`}>
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
