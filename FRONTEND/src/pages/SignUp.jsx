import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../features/userSlice";

const SignUp = () => {
  const navigator = useNavigate();
  const roles = ["user", "owner", "deliveryBoy"];
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullname,
          email,
          password,
          role,
        },
        { withCredentials: true }
      );
      setLoading(false);

      setErr("");
      console.log(response.data);
      dispatch(setUserData(response.data));
      // navigator("/")
    } catch (error) {
      setErr(error.response.data.message);
      console.log("Signup Data Fetchin Error: ", error);
      setLoading(false);
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
          role,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      dispatch(setUserData(response.data));


      // navigator("/")

      // console.log(typeof result);  //object
      // console.log(result.user.email);
      // console.log(result.user.reloadUserInfo);
      // console.log(result.user.emailVerified);
    } catch (error) {
      console.log("FireBase SignUp Error: ", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-lg text-[16px]">
        {/* Heading */}
        <h2 className="mb-1 text-center text-2xl font-semibold text-gray-900 ">
          Create an account
        </h2>

        {/* Form */}
        <form className="space-y-2">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullname"
              className="mb-1 block text-sm font-medium text-gray-700 "
            >
              Full name
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none "
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700 "
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
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

          {/* Role Options */}
          <div className="flex items-center justify-center space-x-2 ">
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                className={`w-1/3 rounded-md cursor-pointer border  px-2 py-2 font-medium transition duration-200 focus:outline-none ${
                  role === r ? "bg-[#9810fa] text-white" : "text-black"
                }`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
          {console.log(role)}

          {/* Sign Up button */}
          <button
            type="submit"
            className="w-full rounded-md bg-purple-600 px-4 py-2 font-medium text-white transition duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 "
            onClick={(e) => handleSignup(e)}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Sign Up"}
          </button>
          {err != "" ? <p className="text-red-600 m-2 text-sm">* {err}</p> : ""}
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center">
          <div className="h-px flex-1 bg-gray-300 " />
          <span className="px-3 text-sm text-gray-500 ">Or</span>
          <div className="h-px flex-1 bg-gray-300 " />
        </div>

        {/* Social sign up */}
        <div className="flex">
          <button
            type="button"
            className="flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100 "
            onClick={handleGoogleAuth}
          >
            <FcGoogle />
            <span>Signup with Google</span>
          </button>
        </div>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-gray-500 ">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="font-medium text-purple-600 hover:text-purple-500 "
          >
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
