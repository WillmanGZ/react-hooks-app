import { Button } from "@/components/ui/button";
import { UserContext } from "@/useContext/context/UserContext";
import { use } from "react";
import { useNavigate } from "react-router";

export const ProfilePage = () => {
  const { user, logout } = use(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      logout();
    }

    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">Perfil del usuario</h1>
      <hr />

      <pre className="my-4 overflow-x-auto w-[50%]">
        {JSON.stringify(user, null, 2)}
      </pre>

      <Button onClick={handleLogout} variant="destructive">
        Salir
      </Button>
    </div>
  );
};
