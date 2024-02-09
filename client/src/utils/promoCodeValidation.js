import * as Yup from "yup";
export const promoValidationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  start_time: Yup.date().required("Start time is required").nullable(),
  end_time: Yup.date().required("End time is required").nullable(),
  discount_rate: Yup.number()
    .required("Discount rate is required")
    .min(0, "Discount rate must be greater than or equal to 0")
    .integer("Discount rate must be an integer"),
  usages: Yup.number()
    .required("Usages is required")
    .min(0, "Usages must be greater than or equal to 0")
    .integer("Usages must be an integer"),
  status: Yup.boolean().required("Status is required"),
});
