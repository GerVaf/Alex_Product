import { useState } from "react";
import { IconHeartFilled } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../../api/hooks/useAuth";
import showToast from "../../../utils/toast";
import Loading from "../../ui/Loading";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const nav = useNavigate();

  const {
    mutate: signup,
    isLoading,
    error: serverError,
  } = useSignup({
    onSuccess: () => {
      showToast.success("Signup successful! Redirecting to login page...");
      nav("/auth/login");
    },
    onError: (error) => {
      showToast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    },
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast.error("Please fill out all fields correctly.");
      return;
    }
    signup({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <>
      {/* Form for signup */}
      <form
        className="w-full main-font h-[100vh] flex flex-col gap-5 items-center py-10 p-5 "
        onSubmit={handleSubmit}
      >
        <div className="hero-font text-secondary text-[30px] md:text-[100px] w-full self-start flex flex-wrap">
          Hello, have a nice day <IconHeartFilled className="text-red-500" />
        </div>
        <div className="w-full flex flex-col gap-3 border p-3 rounded border-slate-300 shadow">
          <div className="flex flex-col gap-2">
            <label className="text-lg">Name</label>
            <input
              className="input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              aria-invalid={errors.username ? "true" : "false"}
              required
            />
            {errors.username && (
              <p role="alert" style={{ color: "red" }}>
                {errors.username}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={errors.email ? "true" : "false"}
              required
            />
            {errors.email && (
              <p role="alert" style={{ color: "red" }}>
                {errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={errors.password ? "true" : "false"}
              required
            />
            {errors.password && (
              <p role="alert" style={{ color: "red" }}>
                {errors.password}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-lg">Confirm Password</label>
            <input
              className="input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              required
            />
            {errors.confirmPassword && (
              <p role="alert" style={{ color: "red" }}>
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button className="gradient-btn" type="submit" disabled={isLoading}>
            {isLoading ? <Loading /> : "Sign Up"}
          </button>
          <div>
            Already have an account?{" "}
            <Link className="text-violet-700" to={"/auth/login"}>
              Login
            </Link>
          </div>
          {serverError && (
            <p role="alert" style={{ color: "red" }}>
              {serverError.response?.data?.message || serverError.message}
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default Signup;
