import * as Yup from "yup";

const stringValidation = (min:number, max:number, label:string) =>
  Yup.string()
    .min(min, `Must be ${min} characters or more`)
    .max(max, `Must be ${max} characters or less`)
    .required(`${label} is required`);

const stringValidationOp = (min:number, max:number, label:string) =>
  Yup.string()
    .min(min, `Must be ${min} characters or more`)
    .max(max, `Must be ${max} characters or less`)
    .optional()
    .nullable()
const requiredString = (label:string) => Yup.string().required(`${label} is required`);
const requiredNumber = (label:string) => Yup.number().required(`${label} is required`);
const requiredDate = (label:string) =>
  Yup.date()
    .required(`${label} letter is required`)
    .typeError(`${label} letter must be a valid date`);
const emailValidation = Yup.string()
  .email("Invalid email address")
  .required("Email is required");
const passwordValidation = stringValidation(3, 12, "Password");
const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password"), ''], "Passwords must match")
  .required("Confirm password is required");

const idValidation = requiredNumber("ID");
const nameValidation = stringValidation(3, 20, "Name");
const addressValidation = stringValidation(3, 200, "Address");
const phoneValidation = requiredNumber("Phone number");
const genderValidation = requiredString("Gender");
const imageValidation = Yup.mixed().required("Image is required");
const reasonValidation = stringValidation(3, 200, "Reason");
const leaveTypeValidation = requiredString("Leave type");
const requestToIdValidation = requiredString("Request to ID");
const otpValidation = stringValidation(3, 4, "Otp");
const divValidation = stringValidationOp(0, 15,"Div");
const departmentValidation = stringValidationOp(0, 15, "Department");
const grNumberValidation = stringValidationOp(0, 15, "Gr Number");
function useModelValidation(type: string) {
  switch (type) {
    case "add_student":
      return Yup.object({
        name: nameValidation,
        email: emailValidation,
        gender: genderValidation,
        image: imageValidation,
        password: passwordValidation,
        confirmPassword: confirmPasswordValidation,
        phone: phoneValidation,
        address: addressValidation,
      });
    case "add_User":
      return Yup.object({
        name: nameValidation,
        email: emailValidation,
        gender: genderValidation,
        image: imageValidation,
        password: passwordValidation,
        confirmPassword: confirmPasswordValidation,
        phone: phoneValidation,
        address: addressValidation,
        role: requiredString("Role"),
      });
    case "update_profile":
      return Yup.object({
        name: nameValidation,
        email: emailValidation,
        gender: genderValidation,
        image: imageValidation,
        phone: phoneValidation,
        address: addressValidation,
      });
    case "editUser":
      return Yup.object({
        name: nameValidation,
        email: emailValidation,
        gender: genderValidation,
        image: imageValidation,
        phone: phoneValidation,
        address: addressValidation,
        grNumber: grNumberValidation,
        div: divValidation,
        department: departmentValidation,
      });
    case "apply_leave":
      return Yup.object({
        reason: reasonValidation,
        leaveType: leaveTypeValidation,
        startDate: requiredDate("Start date"),
        endDate: requiredDate("End date"),
        requestToId: requestToIdValidation,
      });
    case "forget_password":
      return Yup.object({
        otp: otpValidation,
        email: emailValidation,
        password: passwordValidation,
        confirmPassword: confirmPasswordValidation,
      });
    case "login":
      return Yup.object({
        email: emailValidation,
        password: passwordValidation,
      });
    default:
      return Yup.object({});
  }
}

export default useModelValidation;
