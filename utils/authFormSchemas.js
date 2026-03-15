
export const formAction = (currentform, setErrors, errors, onSubmit) => {
  let obj = {};
  let validField = true;
  Object.keys(currentform).map((key) => {
    if (typeof currentform[key] === "string") {
      if (errors[key]?.optional) {
        obj = { ...obj, [key]: { optional: true, message: "" } };
      } else if (currentform[key] == "") {
        obj[key] = "This is field required";
      } else if (!errors[key]?.regex.test(currentform[key])) {
        validField = false;
        obj[key] = errors[key]?.message[1];
      } else {
        validField = true;
      }
    }
  });
  setErrors(obj);

  if (!Object.values(obj).filter((el) => !el?.optional).length && validField) {
    onSubmit(currentform);
  }
};

export const LoginSchema = {
  fields: {
    values: {
      email: "",
      password: "",
    },
    errors: {
      email: {
        regex: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
        message: ["This field is required", "Email id is not valid"],
      },
      password: {
        regex:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: ["This field is required", "Password is not valid"],
      },
    },
  },
};

export const RegisterSchema = {
  fields: {
    values: {
      full_name: "",
      email: "",
      password: "",
    },
    errors: {
      full_name: {
        regex: /^[A-Za-z ]{3,}$/,
        message: ["This field is required", "First name is not valid"],
      },
      email: {
        regex: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
        message: ["This field is required", "Email id is not valid"],
      },
      password: {
        regex:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: ["This field is required", "Password is not valid"],
      },
    },
  },
};