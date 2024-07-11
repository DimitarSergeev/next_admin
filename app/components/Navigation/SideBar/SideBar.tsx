"use client";

import React, { useState } from "react";
import styles from "./SideBar.module.css";
import { LogoutButton } from "@/app/auth";
import { Avatar } from "primereact/avatar";
export default function SideBar() {
  // State to manage the sidebar open/close state
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar open/close and update button icon
  const handleSidebarToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logoDetails}>
          {/* <i className="fa-solid fa-circle-left"></i> */}
          <i
            // className="fa-solid fa-circle-right"
            className={`${
              isOpen ? "fa-brands fa-codepen" : "fa-solid fa-circle-right"
            }`}
            onClick={handleSidebarToggle}
          ></i>
          <div className={styles.logo_name}>SideMenu</div>
          {/* Update the class based on the isOpen state */}
          <i
            className={`${isOpen ? "fa-solid fa-circle-left" : ""}`}
            // className="fa-solid fa-circle-left"
            onClick={handleSidebarToggle}
          />
        </div>
        <ul className={styles.navList}>
          <li>
            <a href="#">
              <i className="fa-solid fa-table-columns"></i>
              <span className={styles.linksName}>Dashboard</span>
            </a>
            <span className={styles.tooltip}>Dashboard</span>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-id-badge"></i>
              <span className={styles.linksName}>User</span>
            </a>
            <span className={styles.tooltip}>User</span>
          </li>

          <li className={styles.profile}>
            <div className={styles.profileDetails}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <div className={styles.name_job}>
                <div
                  className={styles.name}
                  style={{ visibility: isOpen ? "visible" : "hidden" }}
                >
                  Logout
                </div>
              </div>
            </div>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </li>
        </ul>
      </div>
      
    </>
  );
}
