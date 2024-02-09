import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../../components/modal/confirmModal";
import { useCreateProductMutation } from "../../../redux/features/products/productsApi";
import { productValidationSchema } from "../../../utils/productValidation";

const CreateNewProduct = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      img: undefined,
      name: "",
      main_price: "",
      discount_rate: "",
      shipping_charge: "",
      color: "",
      size: "",
      status: false,
    },
    validationSchema: productValidationSchema,
    onSubmit: async (values) => {
      // Modify form data based on status value
      //   const modifiedValues = { ...values };
      //   modifiedValues.status = modifiedValues.status ? "active" : "inactive";

      //   const formData = new FormData();
      //   Object.entries(modifiedValues).forEach(([key, value]) => {
      //     formData.append(key, value);
      //   });

      const formData = new FormData();
      formData.append("img", values.img);
      formData.append("name", values.name);
      formData.append("main_price", values.main_price);
      formData.append("discount_rate", values.discount_rate);
      formData.append("shipping_charge", values.shipping_charge);
      formData.append("color", values.color);
      formData.append("size", values.size);
      formData.append("status", values.status ? "active" : "inactive");
      try {
        await createProduct(formData).unwrap();

        setShowConfirmation(true);
      } catch (err) {
        //
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("img", file);
    // Read the uploaded image and set it as preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(file);
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
              onBlur={formik.handleBlur}
            />
            <div className="h-[200px]  flex flex-col justify-center items-center gap-y-1 bg-[#fff700]">
              {previewImg ? (
                <img
                  src={previewImg}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <p>Upload product image</p>
              )}
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
              Add
            </button>
          </div>
        </form>
      </div>

      {showConfirmation && (
        <ConfirmModal
          onClose={handleConfirmation}
          message={"Your Product added successfully!"}
        />
      )}
    </div>
  );
};

export default CreateNewProduct;
