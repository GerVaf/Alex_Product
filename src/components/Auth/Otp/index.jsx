import { useRef, useState, useEffect } from "react";
import useUserStore from "../../../store/userStore";
import { IconArrowRight } from "@tabler/icons-react";
import { useGetOtp, useVertifyOtp } from "../../../api/hooks/useQuery"; // Updated hook imports
import { useNavigate } from "react-router-dom";
import showToast from "../../../utils/toast";

const OtpCode = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const inputRefs = useRef([]);
  const email = useUserStore((state) => state?.userData.email);

  // Using the custom hooks for OTP resending and verification
  const { mutate: resendOtp, isLoading: isResendingOtp } = useGetOtp();
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

      // Automatically move to next input and verify OTP if all fields are filled
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
    resendOtp(
      { email },
      {
        onSuccess: (response) => {
          console.log("OTP resent successfully", response);
          showToast.success("OTP resent successfully ");
        },
        onError: (error) => {
          console.error("Failed to resend OTP", error);
          // Handle error response if needed
        },
      }
    );
  };
  const nav = useNavigate();
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
          showToast.error("Failed to get OTP. Please try valid email.");
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
            disabled={isResendingOtp}
          >
            Resend OTP
            <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpCode;
