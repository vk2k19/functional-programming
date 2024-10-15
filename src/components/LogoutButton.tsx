import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();
    navigate("/products");
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
