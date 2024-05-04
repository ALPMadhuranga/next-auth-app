"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
//   const session = useSession();
const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
      if(sessionStatus === "authenticated"){
          router.replace("/dashboard");
      }
  }, [sessionStatus, router])

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // console.log(email, password)

    if (!isValidEmail(email)) {
      setError("Email is invalid!");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid!");
      return;
    }

    const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
    })

    if (res?.error) {
        setError("Invalid email or password!");
        if (res?.url) router.replace("/dashboard");
    } else {
        setError("");
        // router.push("/");
    }
  };

  if (sessionStatus === "loading") {
      return <h2>Loading...</h2>;
  }

  return (
    sessionStatus !== 'authenticated' && ( 
    <div className="flex flex-col min-h-screen items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-xl text-white text-center font-semibold mb-8">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            className="w-full bg-[#363636] text-white text-md p-2 rounded mb-4"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#363636] text-white text-md p-2 rounded mb-4"
            required
          />

          <button
            type="submit"
            className="w-full text-white py-2 mt-5 rounded-md bg-slate-500 hover:bg-slate-700"
          >
            {" "}
            Sign In
          </button>

          <div>
            {error && <p className='text-red-500 text-center mt-2'>{error}</p>}
          </div>
        </form>
        <button className="w-full bg-slate-500 text-white py-2 mt-5 rounded-md hover:bg-slate-700" onClick={() => signIn("github")}>Sign In with Github</button>
        <div className="text-center text-gray-400 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-400 hover:underline mt-2"
          href={"/register"}
        >
          Register Here
        </Link>
      </div>
    </div>
    )
  );
};

export default Login;
