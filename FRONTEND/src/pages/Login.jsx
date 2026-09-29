import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      dispatch(setUserData(response.data));
      setLoading(false);

      setErr("");
    } catch (error) {
      setLoading(false);

      setErr(error.response.data.message);
      console.log("Login Data Fetching Error: ", error);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullname: result.user.displayName,
          email: result.user.email,
        },
        { withCredentials: true }
      );

      // navigate("/")
      console.log(response.data);
      dispatch(setUserData(response.data));
    } catch (error) {
      setErr(error.response.data.message);
      console.log("Google Auth Error In Login: ", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white px-8 py-4 shadow-lg md:text-[16px]">
        {/* Heading */}
        <h2 className="mb-1 text-center text-2xl font-semibold text-gray-900 ">
          Welcome
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500 ">
          We are happy to have you back!
        </p>

        <form className="space-y-3">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700 "
            >
              Email or phone
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email or phone"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700 "
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 "
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700 ">
                Remember me
              </label>
            </div>
            <NavLink
              to="/forgot-password"
              className="text-sm font-medium text-purple-600 hover:text-purple-500 "
            >
              Forgot password?
            </NavLink>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            className="w-full rounded-md bg-purple-600 px-2 py-1.5 font-medium text-white transition duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            onClick={(e) => handleLogin(e)}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Sign In"}
          </button>

          {/* Error Message */}
          {err != "" ? <p className="text-red-600 text-sm ">* {err}</p> : ""}
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="h-px flex-1 bg-gray-300 " />
          <span className="px-3 text-sm text-gray-500 ">Or</span>
          <div className="h-px flex-1 bg-gray-300 " />
        </div>

        {/* Social logins */}
        <div className="flex space-x-4">
          <button
            type="button"
            className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer "
            onClick={handleGoogleAuth}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            <span>Google</span>
          </button>
        </div>

        {/* Sign up link */}
        <p className="mt-6 text-center text-sm text-gray-500 ">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="font-medium text-purple-600 hover:text-purple-500 "
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
