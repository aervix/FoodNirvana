import { useState } from "react";
import { GrLinkPrevious } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(second);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        {
          email,
        },
        { withCredentials: true }
      );
      setLoading(false);
      setStep(2);
      console.log("Send OTP :", response.data);
    } catch (error) {
      setLoading(false);

      console.log("Email Error", error);
    }
  };
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      setLoading(false);
      setStep(3);

      console.log(response.data);
    } catch (error) {
      setLoading(false);
      console.log("OTP Error: ", error);
    }
  };

  const handleUpdatePassword = async () => {
    if (password != confirmPassword) {
      console.log("Password And Confirm Password is not match");
      setErr("Password And Confirm Password is not match");
      return null;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email,
          newPassword: password,
          confirmPassword,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      setErr("");
      setLoading(false);
      navigator("/login");
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.message);
      console.log("New Password Error", error);
    }
  };
  return (
    <div className="w-full  min-h-screen">
      {/* Enter A Email Address */}
      {step === 1 && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md border border-gray-200">
            {/* Title */}
            <div className="flex items-center">
              <NavLink to="/login">
                {" "}
                <GrLinkPrevious className="cursor-pointer" />
              </NavLink>
              <h2 className="text-xl font-semibold text-gray-800 text-center ml-[100px] ">
                Forgot password?
              </h2>
            </div>

            {/* Form */}

            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />

            <button
              className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md shadow-sm transition duration-200 cursor-pointer"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "send Otp"}
            </button>

            {err != "" ? <p className="text-red-600 text-sm ">* {err}</p> : ""}
          </div>
        </div>
      )}

      {/* Enter A OTP */}
      {step === 2 && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md border border-gray-200">
            {/* Title */}
            <div className="flex items-center gap-6">
              {" "}
              <GrLinkPrevious
                className="cursor-pointer relative bottom-3.5"
                onClick={() => setStep(1)}
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 text-center ml-8 ">
                  verify
                </h2>
                <p className="text-[16px] mb-4 ml-2">
                  Your code was send your email Address
                </p>
              </div>
            </div>

            {/* Form */}

            <input
              type="number"
              id="otp"
              placeholder="Enter your OTP"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />

            <button
              className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md shadow-sm transition duration-200 cursor-pointer"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Verify"}
            </button>

            {err != "" ? <p className="text-red-600 text-sm ">* {err}</p> : ""}
          </div>
        </div>
      )}

      {/* Enter A New Password */}
      {step === 3 && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md border border-gray-200 space-y-3">
            {/* Title */}
            <div className="flex items-center gap-20 md:mb-6">
              {" "}
              <GrLinkPrevious
                className="cursor-pointer "
                onClick={handleUpdatePassword}
              />
              <h2 className="text-xl font-semibold text-gray-800 text-center  ">
                Update Password
              </h2>
            </div>

            {/* Form */}
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="text"
              id="password"
              placeholder="Enter your New Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="text"
              id="confirmPassword"
              placeholder="Enter Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <button
              className="w-full mt-5 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md shadow-sm transition duration-200 cursor-pointer"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "Reser Password"
              )}
            </button>

            {err != "" ? <p className="text-red-600 text-sm ">* {err}</p> : ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
