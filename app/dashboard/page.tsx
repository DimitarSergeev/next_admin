'use client';

import { useEffect, useState } from "react";

import styles from "./page.module.css";
import PageHeader from "../components/utils/PageHeader";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
  });
  
  useEffect(()=>{
    async function fetchStats(){
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          console.error("Failed to fetch stats");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    fetchStats();
  },[])
   
  return (
    <section className="dashboard-section custom-section">
      <PageHeader title="Dashboard" />

      <div className={styles.statsCards}>
        <div className={styles.statsCard}>
          <i className="pi pi-users"></i>
          <h3>Users</h3>
          <span className={styles.value}>{stats.totalUsers}</span>
        </div>
      </div>
    </section>
  );
}
