import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";
import { User } from "./user";

export default async function Home() {

  return (
    <main>
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <h2>Client Call</h2>
      <User />
    </main>
  );
}
