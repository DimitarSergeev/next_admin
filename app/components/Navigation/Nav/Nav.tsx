"use client";
import styles from "./Nav.module.css";
import { useState, useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { signOut } from "next-auth/react";

interface User {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

interface SessionResponse {
  user?: User;
  error?: string;
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userData, setUserData] = useState<User | undefined>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const session: SessionResponse = await res.json();

          if (session.user && session.user.email) {
            setUserData(session.user);
          }
        } else {
          console.error("Failed to fetch session");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSearch = (value: boolean) => {
    setSearchOpen(value);
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
          <h3>{loading ? "Loading..." : userData?.email || "Dimitar"}</h3>
        </div>
        <i className="fa-solid fa-arrow-down"></i>

        <ul className={`${styles.subItems} ${isOpen ? styles.show : ""}`}>
          <li>
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </li>
          <li onClick={() => signOut()}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
