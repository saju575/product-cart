import * as Yup from "yup";
export const productValidationSchema = Yup.object().shape({
  img: Yup.mixed().required("Image is required"),
  name: Yup.string().required("Name is required"),
  //   main_price: Yup.number()
  //     .min(0, "Price must be non-negative")
  //     .required("Price is required"),
  discount_rate: Yup.number()
    .required("Discount rate is required")
    .min(0, "Discount rate must be greater than or equal to 0")
    .integer("Discount rate must be an integer"),
  //   shipping_charge: Yup.number()
  //     .min(0, "Shipping charge must be non-negative")
  //     .required("Shipping charge is required"),
  color: Yup.string().required("Color is required"),
  size: Yup.string().required("Size is required"),
  status: Yup.boolean().required("Status is required"),
  main_price: Yup.number()
    .min(0, "Main price must be non-negative")
    .required("Main price is required"),
  shipping_charge: Yup.number()
    .min(0, "Shipping charge must be non-negative")
    .required("Shipping charge is required"),
});

export const updateProductValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  //   main_price: Yup.number()
  //     .min(0, "Price must be non-negative")
  //     .required("Price is required"),
  discount_rate: Yup.number()
    .required("Discount rate is required")
    .min(0, "Discount rate must be greater than or equal to 0")
    .integer("Discount rate must be an integer"),
  //   shipping_charge: Yup.number()
  //     .min(0, "Shipping charge must be non-negative")
  //     .required("Shipping charge is required"),
  color: Yup.string().required("Color is required"),
  size: Yup.string().required("Size is required"),
  status: Yup.boolean().required("Status is required"),
  main_price: Yup.number()
    .min(0, "Main price must be non-negative")
    .required("Main price is required"),
  shipping_charge: Yup.number()
    .min(0, "Shipping charge must be non-negative")
    .required("Shipping charge is required"),
});
