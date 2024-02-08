import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-4 rounded bg-white w-[350px]">
        <form className="flex flex-col gap-4">
          <div>
            <label>Phone Number</label>
            <input
              name="phone"
              type="text"
              className="w-full border outline-none"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="w-full border outline-none"
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
