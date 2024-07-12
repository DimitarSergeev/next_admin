import Link from "next/link";

interface MenuProps {
  styles: any;
}

export default function Menu({ styles }: MenuProps) {
  return (
    <ul className={styles.navList}>
      <li>
        <Link href="/dashboard">
          <i className="fa-solid fa-table-columns"></i>
          <span className={styles.linksName}>Dashboard</span>
        </Link>
        <span className={styles.tooltip}>Dashboard</span>
      </li>
      <li>
        <Link href="/users">
          <i className="fa-solid fa-id-badge"></i>
          <span className={styles.linksName}>User</span>
        </Link>
        <span className={styles.tooltip}>User</span>
      </li>
    </ul>
  );
}
