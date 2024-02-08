import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError }] = useLoginMutation();

  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state?.from || "/";

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (phone === "" || password === "") {
      return;
    }
    try {
      await login({ phone, password }).unwrap();

      navigate(previousPath);
    } catch (error) {
      return;
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-4 rounded bg-white w-[350px]">
        <form className="flex flex-col gap-4" onSubmit={handleSubmitLogin}>
          <div>
            <label>Phone Number</label>
            <input
              name="phone"
              type="text"
              className="w-full border outline-none"
              required
              value={phone}
              onChange={(e) => setPhone(() => e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="w-full border outline-none"
              required
              value={password}
              onChange={(e) => setPassword(() => e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#fff700] w-32 px-5 py-1 rounded-2xl"
            >
              Sign In
            </button>
          </div>
          <div className="h-4">
            {isError && (
              <p className="text-red-500 text-sm">Invalid phone or password</p>
            )}
          </div>
          <div className="flex justify-between">
            <p>No Account?</p>
            <Link to={"/signup"} className="text-[#fff700] underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
