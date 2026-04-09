"use client";

import { signIn } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-8 relative z-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome to <span className="text-blue-600">PathlyX</span>!
        </h1>
        <p className="text-slate-500 font-medium">
          Log in to your account to access the dashboard.
        </p>
      </div>

      {error === "AccessDenied" && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-left">
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className="text-sm font-bold text-red-800">Access Denied</h3>
              <div className="mt-2 text-sm text-red-700 space-y-2">
                <p>Please use your authorized staff email.</p>
                <p>
                  New to PathlyX and want to streamline your delivery business?{" "}
                  <Link href="/#contact" className="font-bold underline text-red-800 hover:text-red-900 transition-colors">
                    Contact us here!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => signIn("google", { callbackUrl: "/select-restaurant" })}
        className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 hover:bg-slate-50 hover:shadow-md text-slate-700 font-semibold py-3.5 px-4 rounded-xl transition-all duration-200"
      >
        <svg className="w-6 h-6" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Sign in with Google
      </button>

      <p className="text-xs text-slate-400 mt-4">
        Authorized personnel only. By signing in, you agree to our{" "}
        <a href="#" className="text-slate-500 hover:text-slate-700 font-medium">Terms of Service</a> and <a href="#" className="text-slate-500 hover:text-slate-700 font-medium">Privacy Policy</a>.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
      <div className="absolute top-0 w-full z-50">
        <Navbar isAuthPage={true} />
      </div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Suspense fallback={<div className="text-slate-400">Loading form...</div>}>
          <LoginContent />
        </Suspense>
      </div>
    </div>
  );
}