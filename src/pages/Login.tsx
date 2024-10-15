import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Icon } from "../components/Icon";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // In a real app, you would handle authentication with a backend here.
    // For simplicity, we'll simulate a successful login/signup.
    const user = { email: formData.email };
    if (login) login(user);

    navigate("/products");
  };

  return (
    <div className="f f-col gap f-align-center f-justify-center">
      <h1 className="no-margin">{isSignup ? "Sign Up" : "Log In"}</h1>
      <form
        onSubmit={handleSubmit}
        className="padding f gap f-col f-align-center f-justify-center"
      >
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          label="Email"
        />
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          label="Password"
        />
        <button type="submit" className="mx-w-240 no-padding">
          <Icon>{isSignup ? "Sign Up" : "Log In"}</Icon>
        </button>
      </form>
      <button
        onClick={() => setIsSignup(!isSignup)}
        className="mx-w-240 no-padding"
      >
        <Icon small>
          {isSignup
            ? "Already have an account? Log In"
            : "Need an account? Sign Up"}
        </Icon>
      </button>
    </div>
  );
};

export default Login;
