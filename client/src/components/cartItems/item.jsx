import { FaTrash } from "react-icons/fa";

const Item = () => {
  return (
    <div>
      <div className="flex gap-3 px-2 py-4 mb-2 text-[#4d4d4d]">
        <img
          className="size-16 rounded-sm object-cover"
          // src="https://via.placeholder.com/192x210"
          src="https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
          alt="Product Image"
        />
        <div className="flex flex-col w-full gap-5">
          <div className="flex justify-between items-center">
            <p className="text-sm">Camara</p>
            <FaTrash />
          </div>
          <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between space-y-3 sm:space-y-1">
            <div>
              <div className="flex gap-6">
                <p className="text-sm">Color: Black</p>
                <p className="text-sm">Size: XL</p>
              </div>
              <p className="text-sm">Product Price: BDT. 7850</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm">Shipping Method: EMS</p>
              <p className="text-sm">Shipping Charge: BDT.100</p>
            </div>
            <div className="space-y-1">
              <div className="text-sm flex gap-2">
                Quantity:
                <div className="border flex gap-2 px-3 rounded-xl items-center">
                  <span className="cursor-pointer">+</span>
                  <span className="w-5">10</span>
                  <span className="cursor-pointer">-</span>
                </div>
              </div>
              <p className="text-sm">Total Price: BDT. 7043</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-[#fafafa]" />
    </div>
  );
};

export default Item;
