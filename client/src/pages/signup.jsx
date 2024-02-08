import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/features/auth/authApi";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signup, { isError }] = useRegisterMutation();

  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state?.from || "/";

  const handleSignup = async (e) => {
    e.preventDefault();
    if (phone === "" || password === "") {
      return;
    }
    try {
      await signup({ phone, password }).unwrap();

      navigate(previousPath);
    } catch (error) {
      return;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-4 rounded bg-white w-[350px]">
        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
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
              Sign Up
            </button>
          </div>

          <div className="h-4">
            {isError && (
              <p className="text-red-500 text-sm">Invalid phone or password</p>
            )}
          </div>

          <div className="flex justify-between">
            <p>Have Account?</p>
            <Link to={"/login"} className="text-[#fff700] underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
