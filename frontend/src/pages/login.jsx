import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialValues = {
    username: "",
    password: "",
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
    console.log("Ananya has Submitted");
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate("/home");
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen text-[#1F2E43] bg-[#1F2E43] bg-[url('/bg.svg')] bg-cover bg-center bg-no-repeat">
      {Object.keys(formErrors).length === 0 && isSubmit && (
        <div className="text-green-600 text-lg font-semibold mb-4">
          Logged in successfully
        </div>
      )}

      <form
        onSubmit={AnanyaSubmitted}
        className="w-1/2 border border-gray-300 p-6 rounded-[10px] bg-[#E0EDFD] h-[60%] flex flex-col justify-center gap-4"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Login</h1>

        <div className="flex flex-col gap-3">
          {/* Username Field */}
          <div className="flex flex-col items-center">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Ananya Jain"
              value={formValues.username}
              onChange={handleChange}
              className="text-center w-1/2 py-2 px-3 rounded-[5px] bg-[#1F2E43] text-[#E0EDFD]"
            />
          </div>
          <p className="text-sm text-red-500 text-center">
            {formErrors.username}
          </p>

          {/* Password Field */}
          <div className="flex flex-col items-center">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="23BCE0593"
              value={formValues.password}
              onChange={handleChange}
              className="text-center w-1/2 py-2 px-3 rounded-[5px] bg-[#1F2E43] text-[#E0EDFD]"
            />
          </div>
          <p className="text-sm text-red-500 text-center">
            {formErrors.password}
          </p>

          {/* Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#1F2E43] text-[#E0EDFD] px-6 py-2 rounded-[10px] w-1/2 font-semibold hover:bg-[#16304e] transition duration-300"
            >
              Login
            </button>
          </div>
        </div>

        {/* Signup redirect */}
        <div className="text-[#1F2E43] text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={() => navigate("/signin")}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
