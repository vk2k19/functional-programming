import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton"; // Import LogoutButton

const Navbar = () => {
  const { isAuthenticated, user } = useAuth(); // Get the auth state

  return (
    <nav className="f f-align-center">
      {isAuthenticated && user ? (
        <>
          <LogoutButton />
          <span>Welcome, {user.email}</span>
        </>
      ) : (
        <Link to="/login" className="expand">
          Log In / Sign Up
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
