const AdminLogin = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <div className="w-[320px]">
          <h1 className="text-3xl text-center mb-4">Admin Panel</h1>

          <div className="p-4 rounded bg-white">
            <form className="flex flex-col gap-4">
              <div>
                <label>User ID</label>
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
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-[320px] border rounded mt-4 space-y-2 p-2">
          <p className="font-semibold">Use following credentials to login</p>
          <p className="font-semibold">Username</p>
          <p>01738066750</p>
          <p className="font-semibold">Password</p>
          <p>1234</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
