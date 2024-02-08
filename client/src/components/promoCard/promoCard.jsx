/* eslint-disable react/prop-types */
const PromoCard = ({ index }) => {
  return (
    <div className="px-3 py-2 bg-white gap-3 flex flex-col shadow-sm">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <p>{index}</p>
          <p>FGREE</p>
        </div>
        <div className="flex items-center">
          <button type="button" className="bg-[#fff700] p-2 w-24 rounded-3xl">
            Edit
          </button>
          <button type="button" className="bg-[#fffee1] p-2 w-24  rounded-3xl">
            Active
          </button>
        </div>
      </div>
      <div className="bg-[#f3f3f3] h-[1px]" />

      <div className="flex justify-between items-center text-sm">
        <div>
          <p>Created At: 10.01pm, 3/11/2022</p>
        </div>
        <div>
          <p>Usages: 0</p>
        </div>
        <div>
          <p>Discount Rate: 5%</p>
        </div>
        <div>
          <p>Start Date: 1/11/2022</p>
        </div>
        <div>
          <p>End Date: 1/11/2022</p>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
