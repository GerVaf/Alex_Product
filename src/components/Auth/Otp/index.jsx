import { useRef, useState, useEffect } from "react";
import useUserStore from "../../../store/userStore";
import { IconArrowRight } from "@tabler/icons-react";
import { useGetOtp, useVertifyOtp } from "../../../api/hooks/useQuery"; 
import { useNavigate } from "react-router-dom";
import showToast from "../../../utils/toast";

const OtpCode = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isResendingOtp, setIsResendingOtp] = useState(false); 
  const inputRefs = useRef([]);
  const email = useUserStore((state) => state?.userData.email);
  const nav = useNavigate();

  // Using the custom hooks for OTP resending and verification
  const { mutate: resendOtp } = useGetOtp();
  const { mutate: verifyOtp } = useVertifyOtp();

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInput = (e, index) => {
    const value = e.target.value.toUpperCase();
    if (/^[A-Z0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value.length >= 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
      // Verify OTP if all fields are filled
      if (newOtp.every((val) => val.length > 0)) {
        handleVerifyOtp(newOtp.join(""));
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const newOtp = paste.split("").slice(0, 4);
    setOtp(newOtp);

    newOtp.forEach((value, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = value;
      }
    });

    inputRefs.current[newOtp.length - 1].focus();
    if (newOtp.every((val) => val.length > 0)) {
      handleVerifyOtp(newOtp.join(""));
    }
  };

  const handleResendOtp = () => {
    setIsResendingOtp(true); 
    resendOtp(
      { email },
      {
        onSuccess: (response) => {
          console.log("OTP resent successfully", response);
          showToast.success("OTP resent successfully ");
        },
        onError: (error) => {
          console.error("Failed to resend OTP", error);
          showToast.error("Failed to resend OTP. Please try again.");
        },
        onSettled: () => {
          setIsResendingOtp(false); // Reset button state
        },
      }
    );
  };

  const handleVerifyOtp = (otpValue) => {
    verifyOtp(
      { email, otp: otpValue },
      {
        onSuccess: (response) => {
          console.log("OTP verified successfully", response);
          nav("/auth/login");
          showToast.success("Verification Success ");
        },
        onError: (error) => {
          console.error("Failed to verify OTP", error);
          showToast.error("Failed to verify OTP. Please try again.");
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#EAF5F6] p-5">
      <div className="w-[400px] p-[50px] bg-white rounded-[25px]">
        <h3 className="text-[28px] font-bold text-[#093030] mb-[25px]">
          OTP Verification
        </h3>
        <p className="text-[#B5BAB8] text-[14px] mb-[25px] ">
          Enter the OTP you received to
          <span className="block text-[#093030] font-semibold">{email}</span>
        </p>
        <div className="grid grid-cols-4 gap-2" onPaste={handlePaste}>
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              ref={(el) => (inputRefs.current[index] = el)}
              className="field w-[50px] focus:outline-violet-500 h-[75px] text-[32px] bg-[#EAF5F6] text-center text-[#093030] uppercase rounded-[5px]"
              maxLength="1"
              value={value}
              onChange={(e) => handleInput(e, index)}
            />
          ))}
        </div>
        <div className="flex flex-col">
          <button
            className="mt-[25px] gap-2 flex bg-transparent border-none font-semibold text-violet-700 cursor-pointer"
            onClick={handleResendOtp}
            disabled={isResendingOtp} // Disable button during resend request
          >
            {isResendingOtp ? (
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
              <>
                Resend OTP
                <IconArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpCode;
