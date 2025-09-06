"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface SignUpPopupProps {
  show: boolean;
  onClose: () => void;
  // This new prop allows switching to the login modal
  onSwitchToLogin: () => void;
}

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.534-11.082-8.294l-6.573,4.817C9.656,39.663,16.318,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.904,36.213,44,30.651,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);

export default function SignUpPopup({
  show,
  onClose,
  onSwitchToLogin,
}: SignUpPopupProps) {
  const { googleLogin } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLogin(tokenResponse.access_token);
      onClose();
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center relative animate-fade-in-down">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h3 className="text-2xl font-bold text-[#3D5A6C] mb-2">
          Join Missland
        </h3>
        <p className="text-gray-500 mb-6">
          Sign up to save styles and get personalized recommendations.
        </p>

        <div className="space-y-3">
          <Link
            href="/register"
            className="w-full block bg-[#3D5A6C] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#314A5A] transition"
          >
            Continue with Email
          </Link>
          <button
            onClick={() => handleGoogleLogin()}
            className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => {
              onClose(); // Close the sign-up popup
              onSwitchToLogin(); // Open the login modal
            }}
            className="font-semibold text-[#D98B99] hover:underline focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
