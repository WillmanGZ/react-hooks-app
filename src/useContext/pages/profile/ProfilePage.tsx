import { Button } from "@/components/ui/button";
import { UserContext } from "@/useContext/context/UserContext";
import { use } from "react";
import { Link } from "react-router";

export const ProfilePage = () => {
  const { user } = use(UserContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">Perfil del usuario</h1>
      <hr />

      <pre className="my-4 overflow-x-auto">{JSON.stringify(user, null, 2)}</pre>

      <Link to="/">
        <Button variant="destructive">Salir</Button>
      </Link>
    </div>
  );
};
