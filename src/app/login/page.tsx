import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In - Automobile Management System",
    description: "Access your automobile management dashboard",
};

const LoginPage = () => {
    return <LoginForm />;
};

export default LoginPage;