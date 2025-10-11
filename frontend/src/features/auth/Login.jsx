
import { useState, useContext } from "react";
import { login as loginService, register as registerService } from "../../services/authService.js";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // for registration
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isRegister) {
        // Call backend register endpoint
        data = await registerService(name, email, password);
      } else {
        // Call backend login endpoint
        data = await loginService(email, password);
      }

      // Save token and user in context + localStorage (as 'auth')
      setUser(data.user);
      localStorage.setItem("auth", JSON.stringify({
        user: data.user,
        token: data.token,
        expiresAt: Date.now() + 1000 * 60 * 60 * 24 // 24h expiry
      }));
      navigate("/"); // navigate to home after login/register
    } catch (err) {
      alert(err.message || "Login/Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          className="text-blue-500 underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default Login;
