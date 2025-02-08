function useInitialValues(type: string) {
  let initialValues: any = {};

  switch (type) {
    case "add_student":
      initialValues = {
        name: "",
        email: "",
        gender: "",
        image: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
      };
      break;
    case "login":
      initialValues = {
        email: "",
        password: "",
      };
      break;
    case "update_profile":
      initialValues = {
        name: "",
        email: "",
        gender: "",
        image: "",
        phone: "",
        address: "",
      };
      break;
    case "editUser":
      initialValues = {
        name: "",
        email: "",
        gender: "",
        image: "",
        phone: "",
        address: "",
        grNumber: "",
        div: "",
        department: "",
      };
      break;
    case "apply_leave":
      initialValues = {
        reason: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        requestToId: "",
      };
      break;
    case "forget_password":
      initialValues = {
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
      };
      break;
    case "add_User":
      initialValues = {
        name: "",
        email: "",
        gender: "",
        image: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        role: "",
      };
      break;
    default:
      initialValues = {};
      break;
  }

  return initialValues;
}

export default useInitialValues;
