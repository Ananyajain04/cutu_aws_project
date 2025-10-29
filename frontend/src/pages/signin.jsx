import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const initialValues = {
    name: "",
    birthday: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const AnanyaSubmitted = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate("/home");
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Full name is required!";
    if (!values.birthday) errors.birthday = "Birthday is required!";
    if (!values.username) errors.username = "Username is required!";
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed 10 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen text-[#1F2E43] bg-[#1F2E43] bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="text-green-600 text-lg font-semibold">
          Signed in successfully
        </div>
      ) : (
        console.log("Entered Details", formValues)
      )}

      <form
        onSubmit={AnanyaSubmitted}
        className="w-1/2 border border-gray-300 p-6 rounded-[10px] bg-[#E0EDFD] h-[80%] flex flex-col justify-center gap-4"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Sign In</h1>
        <div className="flex flex-col gap-2">
          {/* Full Name */}
          <div className="flex flex-col items-center ">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formValues.name}
              onChange={handleChange}
              className="text-center w-1/2 rounded-[5px] py-2 px-3 bg-[#1F2E43] text-[#E0EDFD]"
            />
          </div>
          <p className="text-red-500 text-sm text-center">{formErrors.name}</p>

          {/* Birthday */}
          <div className="flex flex-col items-center text-center justify-center">
            <label>Birthday</label>
            <input
              type="date"
              name="birthday"
              value={formValues.birthday}
              onChange={handleChange}
              className="text-center appearance-none w-1/2 rounded-[5px] py-2 px-[18] bg-[#1F2E43] text-[#E0EDFD]"
            />
          </div>
          <p className="text-red-500 text-sm text-center">
            {formErrors.birthday}
          </p>

          {/* Username */}
          <div className="flex flex-col items-center">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formValues.username}
              onChange={handleChange}
              className="text-center w-1/2 rounded-[5px] py-2 px-3 bg-[#1F2E43] text-[#E0EDFD]"
            />
          </div>
          <p className="text-red-500 text-sm text-center">
            {formErrors.username}
          </p>

          {/* Password */}
          <div className="flex flex-col items-center justify-center">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
              className="text-center w-1/2 rounded-[5px] py-2 px-3 bg-[#1F2E43] text-[#E0EDFD]"
            />
          </div>
          <p className="text-red-500 text-sm text-center">
            {formErrors.password}
          </p>

          {/* Confirm Password */}
          <div className="flex flex-col items-center">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formValues.confirmPassword}
              onChange={handleChange}
              className="text-center w-1/2 rounded-[5px] py-2 px-3 bg-[#1F2E43] text-[#E0EDFD]"
            />
          </div>
          <p className="text-red-500 text-sm text-center">
            {formErrors.confirmPassword}
          </p>

          {/* Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#1F2E43] text-[#E0EDFD] rounded-[10px] px-6 py-2 w-1/2 font-semibold hover:bg-[#16304e] transition duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
