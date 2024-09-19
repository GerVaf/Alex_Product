import { useState } from "react";
import { IconHeartFilled } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../../../api/hooks/useAuth";
import showToast from "../../../utils/toast";
import useUserStore from "../../../store/userStore";
import { useGetOtp } from "../../../api/hooks/useQuery";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Track button click state
  const nav = useNavigate();
  const setUserData = useUserStore((state) => state.setUserData);

  // Destructure signup and getOtp hooks
  const { mutate: signup, isLoading } = useSignup();
  const { mutate: getOtp } = useGetOtp();

  const handleSignupSuccess = async (data) => {
    try {
      // Call getOtp API
      await getOtp({ email: formData.email });
      showToast.success("Signup successful! Check your email for OTP");
      setUserData(data, null);
      nav("/auth/otp");
    } catch {
      showToast.error("Failed to get OTP. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset button state
    }
  };

  const handleSignupError = (error) => {
    console.log(error)
    showToast.error(
      error.response?.data?.message || "Signup failed. Please try again."
    );
    setIsSubmitting(false); // Reset button state
  };

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
    setIsSubmitting(true); // Set button state to submitting
    signup(
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      },
      {
        onSuccess: handleSignupSuccess,
        onError: handleSignupError,
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <>
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
          <button
            className="gradient-btn flex justify-center"
            type="submit"
            disabled={isLoading || isSubmitting} // Disable button during submission
          >
            {isLoading || isSubmitting ? (
              <svg
                className="text-gray-300 animate-spin"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            ) : (
              "Signup"
            )}
          </button>
        </div>
        <p>
          Already have an account?{" "}
          <Link className="text-primary font-bold" to="/auth/login">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default Signup;
