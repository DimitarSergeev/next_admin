"use client";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useRouter } from "next/navigation";
import { Menu } from "primereact/menu";
import styles from "./page.module.css";
import PageHeader from "../components/utils/PageHeader";
import Image from "next/image";

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
    return (
      <Image
        src={imageUrl}
        width={60}
        height={60}
        alt="Picture of the author"
        className="avatar-image"
      />
    );
   
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

  const actionBtnsTemplate = (user: User) => {
    const menu = useRef<Menu>(null);

    const items = [
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          router.push(`/users/edit/${user.id}`);
        },
      },
    ];
    return (
      <div className={styles.actionBtns}>
        <Menu model={items} popup ref={menu} id={`overlay_menu_${user.id}`} />
        <button
          className="p-button p-component"
          onClick={(event) => menu.current?.toggle(event)}
        >
          <i className="pi pi-cog"></i>
        </button>
      </div>
    );
  };

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
        <Column header="" body={actionBtnsTemplate}></Column>
      </DataTable>
    </section>
  );
}
