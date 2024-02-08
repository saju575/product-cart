const AdminProductCard = () => {
  return (
    <div>
      <div
        className={`w-[150px] sm:w-[200px] rounded overflow-hidden shadow relative `}
      >
        <div className={``}>
          <div className="p-2 w-[145px] sm:w-[196px] h-[180px] sm:h-[210px]">
            <img
              className="w-[145px] sm:w-[196px] h-[180px] sm:h-[210px] object-cover"
              // src="https://via.placeholder.com/192x210"
              src="https://t3.ftcdn.net/jpg/00/96/74/82/360_F_96748234_L1OpQlE8LQJmmjGpeQZvcOVOkhxCPzCa.jpg"
              alt="Product Image"
            />
          </div>
          <div className="p-2">
            <div className="py-4">
              <div className="mb-2 text-[#4d4d4d] text-sm">Camera</div>
            </div>
            <div className="flex justify-between items-center">
              <p>BDT. 7850</p>
              <div className="bg-[#ffee00] rounded-sm w-11 h-6 flex items-center justify-center">
                15%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
