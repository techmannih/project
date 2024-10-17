import { useState } from "react";
import { signup } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, password);
      console.log(username, password);
      onSignup();
      console.log("Signup successful");
      navigate("/login");
    } catch (error) {
      setError(error.message);
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-black flex p-8 m-8 text-white border-white border-2 rounded-xl">
        <div className="box">
          <div className="text-center py-6 text-xl font-bold">Sign Up</div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="m-5">
              <input
                className="bg-black p-2 hover:border-white hover:border-2 hover:rounded-xl"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="m-5">
              <input
                className="bg-black p-2 hover:border-white hover:border-2 hover:rounded-xl"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            {error && <p className="text-red-500 m-2 p-2">{error}</p>}
            <div className="text-center">
              <button
                type="submit"
                className="cursor-pointer hover:bg-white hover:text-black border-white border-2 rounded-xl font-bold py-3 px-24"
              >
                Sign Up
              </button>
            </div>
            <div className="flex m-5 justify-between font-bold">
              <Link to="/login">
                <input
                  className="cursor-pointer"
                  type="button"
                  value="Already have an account?"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
