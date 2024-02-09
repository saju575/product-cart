import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../../../components/modal/confirmModal";
import {
  useGetProductQuery,
  useImageUpdateMutation,
  useUpdateProductMutation,
} from "../../../redux/features/products/productsApi";
import { updateProductValidationSchema } from "../../../utils/productValidation";

const UpdateProduct = () => {
  const { productId } = useParams();
  const { data, refetch } = useGetProductQuery(productId);
  const [updateProductInfo] = useUpdateProductMutation();
  const [updateProductImage] = useImageUpdateMutation();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigation = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.payload?.name || "",
      main_price: data?.payload?.main_price || "",
      discount_rate: data?.payload?.discount_rate || "",
      shipping_charge: data?.payload?.shipping_charge || "",
      color: data?.payload?.color || "",
      size: data?.payload?.size || "",
      status: data?.payload?.status === "active" ? true : false,
    },
    validationSchema: updateProductValidationSchema,
    onSubmit: async (values) => {
      try {
        await updateProductInfo({
          id: productId,
          data: {
            ...values,
            status: values.status ? "active" : "inactive",
          },
        }).unwrap();
        setShowConfirmation(true);
      } catch (error) {
        //
      }
    },
  });

  const handleImageChange = async (e) => {
    const form = new FormData();
    form.append("img", e.target.files[0]);
    await updateProductImage({ id: productId, data: form }).unwrap();
    refetch();
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    // Remove any non-numeric characters
    const numericValue = value.replace(/[^0-9.]/g, "");
    // Convert to number (if valid) and update formik values
    const parsedValue = parseFloat(numericValue);
    formik.setFieldValue(name, isNaN(parsedValue) ? "" : parsedValue);
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    navigation("/admin/productlist");
  };
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center">
      <div className="p-4 bg-white border outline-none">
        <form onSubmit={formik.handleSubmit}>
          <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-4">
            <input
              type="file"
              name="img"
              id="images"
              accept="image/*" // accept only the image
              className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
              title="Try to upload photos..."
              onChange={handleImageChange}
            />
            <div className="h-[200px]  flex flex-col justify-center items-center gap-y-1 bg-[#fff700]">
              <img
                src={data?.payload?.img?.url}
                alt="preview"
                className="h-full w-full object-cover"
              />

              {/* <img alt="placeholder" src="/images/download.png" /> */}
              {/* <div className="w-max">Add Images</div> */}
            </div>
          </div>
          <div>
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-1 border outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />

            <div className="h-4">
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500">{formik.errors.name}</p>
              )}
            </div>
          </div>

          <div>
            <label>Product Price (Before discount)</label>
            <input
              type="text"
              name="main_price"
              className="w-full p-1 border outline-none"
              onChange={handleNumericChange}
              onBlur={formik.handleBlur}
              value={formik.values.main_price}
            />

            <div className="h-4">
              {formik.touched.main_price && formik.errors.main_price && (
                <p className="text-red-500">{formik.errors.main_price}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="discount_rate">Discount Rate</label>
            <input
              type="text"
              name="discount_rate"
              className="w-full p-1 border outline-none"
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                formik.setFieldValue(
                  "discount_rate",
                  isNaN(newValue) ? "" : newValue
                );
              }}
              onBlur={formik.handleBlur}
              value={formik.values.discount_rate}
            />
            <div className="h-4">
              {formik.touched.discount_rate && formik.errors.discount_rate && (
                <p className="text-red-500">{formik.errors.discount_rate}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="">Shipping Charge</label>
            <input
              type="text"
              name="shipping_charge"
              className="w-full p-1 border outline-none"
              onChange={handleNumericChange}
              onBlur={formik.handleBlur}
              value={formik.values.shipping_charge}
            />

            <div className="h-4">
              {formik.touched.shipping_charge &&
                formik.errors.shipping_charge && (
                  <p className="text-red-500">
                    {formik.errors.shipping_charge}
                  </p>
                )}
            </div>
          </div>

          <div>
            <label htmlFor="color">Color</label>
            <input
              type="text"
              name="color"
              className="w-full p-1 border outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.color}
            />

            <div className="h-4">
              {formik.touched.color && formik.errors.color && (
                <p className="text-red-500">{formik.errors.color}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="size">Size</label>
            <input
              type="text"
              name="size"
              className="w-full p-1 border outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.size}
            />

            <div className="h-4">
              {formik.touched.size && formik.errors.size && (
                <p className="text-red-500">{formik.errors.size}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <label htmlFor="status">Status</label>

            <div>
              <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
                <input
                  type="checkbox"
                  checked={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="status"
                  className="sr-only"
                />
                <span className="label flex items-center text-sm font-medium text-black">
                  No
                </span>
                <span
                  className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                    formik.values.status ? "bg-[#212b36]" : "bg-[#CCCCCE]"
                  }`}
                >
                  <span
                    className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                      formik.values.status ? "translate-x-[28px]" : ""
                    }`}
                  ></span>
                </span>
                <span className="label flex items-center text-sm font-medium text-black">
                  Yes
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="shadow-sm bg-[#fff700] px-5 py-1 rounded-2xl"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      {showConfirmation && (
        <ConfirmModal
          onClose={handleConfirmation}
          message={"Your Product updated successfully!"}
        />
      )}
    </div>
  );
};

export default UpdateProduct;
