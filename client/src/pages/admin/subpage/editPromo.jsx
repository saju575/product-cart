import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../../../components/modal/confirmModal";
import {
  useGetPromoQuery,
  useUpdatePromoMutation,
} from "../../../redux/features/promo/promoApi";
import { promoValidationSchema } from "../../../utils/promoCodeValidation";

const EditPromo = () => {
  const { promoId } = useParams();
  const { data } = useGetPromoQuery(promoId);
  const [updatePromos] = useUpdatePromoMutation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigation = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: data?.payload?.code || "",
      start_time: moment(data?.payload?.start_time).format("YYYY-MM-DD") || "",
      end_time: moment(data?.payload?.end_time).format("YYYY-MM-DD") || "",
      discount_rate: data?.payload?.discount_rate || "",
      usages: data?.payload?.usages || "",
      status: data?.payload?.status === "active" ? true : false || false,
    },
    validationSchema: promoValidationSchema,
    onSubmit: async (values) => {
      try {
        await updatePromos({
          id: promoId,
          data: {
            ...values,
            status: values.status ? "active" : "inactive",
          },
        }).unwrap();
        setShowConfirmation(true);
      } catch (error) {
        //
      }
      //   console.log(values);
    },
  });

  const handleConfirmation = () => {
    setShowConfirmation(false);
    navigation("/admin/promolist");
  };
  return (
    <>
      <div className="py-8 px-4 min-h-[90vh] flex items-center justify-center">
        <div className="bg-white p-8 shadow rounded">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="code">Promo Code</label>
              <input
                type="text"
                name="code"
                className="w-full p-1 border outline-none"
                onChange={(e) => {
                  formik.setFieldValue("code", e.target.value.toUpperCase());
                }}
                onBlur={formik.handleBlur}
                value={formik.values.code}
                readOnly
              />
              <div className="h-4">
                {formik.touched.code && formik.errors.code ? (
                  <div className="text-red-500">{formik.errors.code}</div>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="start_time">Start Date</label>
              <input
                type="date"
                name="start_time"
                className="w-full p-1 border outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.start_time}
                readOnly
              />
              <div className="h-4">
                {formik.touched.start_time && formik.errors.start_time && (
                  <p className="text-red-500">{formik.errors.start_time}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="end_time">End Date</label>
              <input
                type="date"
                name="end_time"
                className="w-full p-1 border outline-none"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.end_time}
              />
              <div className="h-4">
                {formik.touched.end_time && formik.errors.end_time && (
                  <p className="text-red-500">{formik.errors.end_time}</p>
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
                {formik.touched.discount_rate &&
                  formik.errors.discount_rate && (
                    <p className="text-red-500">
                      {formik.errors.discount_rate}
                    </p>
                  )}
              </div>
            </div>

            <div>
              <label htmlFor=" usages">Used Times</label>
              <input
                type="text"
                name="usages"
                className="w-full p-1 border outline-none"
                onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  formik.setFieldValue(
                    "usages",
                    isNaN(newValue) ? "" : newValue
                  );
                }}
                onBlur={formik.handleBlur}
                value={formik.values.usages}
              />
              <div className="h-4">
                {formik.touched.usages && formik.errors.usages ? (
                  <div className="text-red-500">{formik.errors.usages}</div>
                ) : null}
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
      </div>

      {showConfirmation && (
        <ConfirmModal
          onClose={handleConfirmation}
          message={"Your promo has been updated"}
        />
      )}
    </>
  );
};

export default EditPromo;
