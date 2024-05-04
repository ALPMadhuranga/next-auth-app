"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => { // all the children can access to the this session variable
    return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;