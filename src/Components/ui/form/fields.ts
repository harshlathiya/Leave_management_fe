// Common form field definitions
const formFields = {
  name: { id: "name", name: "name", title: "Name", type: "text" },
  department: {
    id: "department",
    name: "department",
    title: "Department",
    type: "text",
  },
  div: { id: "div", name: "div", title: "Div", type: "text" },
  email: { id: "email", name: "email", title: "Email", type: "email" },
  phone: { id: "phone", name: "phone", title: "Phone Number", type: "number" },
  grNumber: {
    id: "grNumber",
    name: "grNumber",
    title: "Gr Number ",
    type: "number",
  },
  otp: { id: "otp", name: "otp", title: "Otp", type: "number" },
  address: {
    id: "address",
    name: "address",
    title: "Address",
    type: "textarea",
  },
  gender: {
    id: "gender",
    name: "gender",
    title: "Gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  image: { id: "image", name: "image", title: "User Image", type: "file" },
  password: {
    id: "password",
    name: "password",
    title: "Password",
    type: "password",
  },
  confirmPassword: {
    id: "confirmPassword",
    name: "confirmPassword",
    title: "Confirm Password",
    type: "password",
  },
  reason: { id: "reason", name: "reason", title: "Reason", type: "text" },
  startDate: {
    id: "startDate",
    name: "startDate",
    title: "Start Date",
    type: "date",
  },
  endDate: { id: "endDate", name: "endDate", title: "End Date", type: "date" },
  leaveType: {
    id: "leaveType",
    name: "leaveType",
    title: "Leave Type",
    type: "radio",
    options: [
      { label: "First half", value: "First half" },
      { label: "Second half", value: "Second half" },
      { label: "Full day", value: "Full day" },
    ],
  },
  requestToId: {
    id: "requestToId",
    name: "requestToId",
    title: "RequestToId",
    type: "select",
    options: [{ label: "Faculty/Hod", value: "2" }],
  },
  role: {
    id: "role",
    name: "role",
    title: "role",
    type: "select",
    options: [
      { label: "Student", value: "4" },
      { label: "Faculty", value: "3" },
    ],
  },
};

// Specific form configurations using the common form fields
export const applyLeave = [
  formFields.reason,
  formFields.startDate,
  formFields.endDate,
  formFields.leaveType,
  formFields.requestToId,
];

export const updateProfile = [
  formFields.name,
  formFields.email,
  formFields.phone,
  formFields.address,
  formFields.gender,
  formFields.image,
];
export const editUser = [
  formFields.name,
  formFields.email,
  formFields.phone,
  formFields.address,
  formFields.gender,
  formFields.div,
  formFields.grNumber,
  formFields.department,
  formFields.image,
];

export const signUp = [
  formFields.name,
  formFields.email,
  formFields.phone,
  formFields.address,
  formFields.gender,
  formFields.image,
  formFields.password,
  formFields.confirmPassword,
];
export const login = [formFields.email, formFields.password];
export const addUser = [
  formFields.name,
  formFields.email,
  formFields.phone,
  formFields.address,
  formFields.gender,
  formFields.image,
  formFields.password,
  formFields.confirmPassword,
  formFields.role,
];
export const sendEmail = [formFields.email];
export const otpInput = [formFields.otp];
export const resetPassword = [formFields.password, formFields.confirmPassword];
