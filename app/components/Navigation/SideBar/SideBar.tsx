"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./SideBar.module.css";
import Menu from "../menu";

export default function SideBar() {
  // State to manage the sidebar open/close state
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar open/close and update button icon
  const handleSidebarToggle = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }

    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [isOpen]);
  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logoDetails}>
          <i
            className={`${
              isOpen ? "fa-brands fa-codepen" : "fa-solid fa-circle-right"
            }`}
            onClick={handleSidebarToggle}
          ></i>
          <div className={styles.logo_name}>SideMenu</div>
          <i
            className={`${isOpen ? "fa-solid fa-circle-left" : ""}`}
            onClick={handleSidebarToggle}
          />
        </div>
        <Menu styles={styles} />
      </div>
    </>
  );
}
