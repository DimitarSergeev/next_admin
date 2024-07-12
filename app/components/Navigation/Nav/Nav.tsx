"use client";
import styles from "./Nav.module.css";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import Image from "next/image";
import Menu from "../menu";
import { usePathname } from "next/navigation";

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
  const [mobileVisible, setMobileVisible] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
   setMobileVisible(false);
  }, [pathname]);
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
  useEffect(()=>{

  },[])
  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSearch = (value: boolean) => {
    setSearchOpen(value);
  };

  const imagePath = userData?.image || "/images/avatar-placeholder.jpg";
  return (
    <>
      <nav className={styles.navigation}>
        <Button
          icon="pi pi-bars"
          onClick={() => setMobileVisible(true)}
          className={styles.toggleBtn}
        />
        <div className={styles.wrapper}>
          <div className={styles.headerSearch}>
            <div className={`${styles.mainSearch}`}>
              <div
                className={`${styles.inputGroup} ${
                  searchOpen ? styles.open : ""
                }`}
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
              <Image
                src={imagePath}
                width={35}
                height={35}
                alt="Picture of the author"
                className="avatar-image"
              />
              <h3 className={styles.userEmail}>{loading ? "Loading..." : userData?.email || "Dimitar"}</h3>
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
        </div>
      </nav>
      <Sidebar
        visible={mobileVisible}
        className={styles.sidebarMobile}
        onHide={() => setMobileVisible(false)}
      >
        <div className={`${styles.sidebar} `}>
          <div className={styles.logoDetails}>
            <i className={`${"fa-brands fa-codepen"}`}></i>
            <div className={styles.logo_name}>SideMenu</div>
          </div>
          <Menu styles={styles} />
        </div>
      </Sidebar>
    </>
  );
}
