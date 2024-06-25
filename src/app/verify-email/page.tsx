"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [token, settoken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState("");

  const router = useRouter();

  const onVerify = async () => {
    try {
      await axios.post(`/api/users/verify-email`, { token });
      setverified(true);
      toast.success("Email Verified");
      router.push(`/`);
    } catch (error: any) {
      seterror(error.response.data);
      toast.error("Error Veritying Email");
    }
  };

  useEffect(() => {
    seterror("");
    const urlToken = window.location.search.split("=")[1];

    //NOTE: Get token from URL using NextJS server
    // const { query } = router;
    // const nextUrlToken = query.token;

    settoken(urlToken || "");
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-dvh py-2">
      <h1 className="text-4xl font-bold pb-8">Verify Email</h1>
      {(verified && (
        <div>
          <h2 className="text-green p-8">Verified</h2>
          <Link
            className="p-2 border border-text/70 rounded-lg mb-4 focus:outline-none focus:border-text"
            href={"/login"}
          >
            Login
          </Link>
        </div>
      )) ||
        (token.length > 0 && (
          <div>
            <button
              className="py-2 px-4 border border-text/70 rounded-lg mb-4 focus:outline-none focus:border-text"
              type="button"
              onClick={onVerify}
            >
              Click To Verify
            </button>
          </div>
        )) || (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl">Please Verify Your Email</h2>
            <p className="text-sm">
              please check your inbox to complete the signup process
            </p>
          </div>
        )}
    </div>
  );
}
