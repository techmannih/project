import { useState } from "react";
import { login } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie"; 

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginData.username, loginData.password);
      console.log("Login successful:", response);

      const { token, userId } = response;

      // Set token and userId in cookies
      Cookies.set("token", token, { expires: 7 }); 
      Cookies.set("userId", userId, { expires: 7 });

      console.log("Token:", token, "UserId:", userId);

      onLogin(token, userId);
      navigate("/gallery");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-black flex p-8 m-8 text-white border-white border-2 rounded-xl">
        <div className="box">
          {error && <div className="text-red-500 text-center p-2">{error}</div>}
          <div className="text-center py-6 text-xl font-bold">Log In</div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="m-5">
              <input
                className="bg-black p-2 hover:border-white hover:border-2 hover:rounded-xl"
                type="text"
                value={loginData.username}
                onChange={handleChange}
                name="username"
                placeholder="Username"
                required
              />
            </div>
            <div className="m-5">
              <input
                className="bg-black p-2 hover:border-white hover:border-2 hover:rounded-xl"
                type="password"
                value={loginData.password}
                onChange={handleChange}
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="cursor-pointer hover:bg-white hover:text-black border-white border-2 rounded-xl font-bold py-3 px-24"
              >
                Login
              </button>
            </div>
            <div className="flex m-5 justify-between font-bold">
              <Link to="/signup">
                <input
                  className="cursor-pointer"
                  type="button"
                  value="Sign Up"
                />
              </Link>
              <Link to="/forgot">
                <input
                  className="cursor-pointer"
                  type="button"
                  value="Need Help?"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
