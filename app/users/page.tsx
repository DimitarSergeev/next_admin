"use client";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";
import PageHeader from "../components/utils/PageHeader";

interface User {
  id: number;
  email: string;
  name?: string | null;
  image?: string | null;
}

export default function UserList() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const imageBodyTemplate = (user: User) => {
    const imageUrl = user?.image || "/images/avatar-placeholder.jpg";
    return <Avatar image={imageUrl} size="large" shape="circle" />;
  };

  const renderHeader = () => {
    return (
      <div className={styles.tableHeader}>
        <h2>Users</h2>
        <span className={styles.iconCont}>
          <i className={`pi pi-search ${styles.searchIcon}`} />
          <InputText
            type="search"
            className={`${styles.inputIcon}`}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Global Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  if (loading) return <p>Loading...</p>;

  return (
    <section className="dashboard-section custom-section">
    
      <PageHeader title="" link="/users/create" linkText="Create User" />
      <DataTable
        value={users}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        header={header}
        globalFilterFields={["name", "email"]}
        filters={{ global: { value: globalFilter, matchMode: "contains" } }}
      >
        <Column header="Image" body={imageBodyTemplate}></Column>
        <Column
          sortable
          field="name"
          header="Name"
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="email"
          header="Email"
          sortable
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </section>
  );
}
