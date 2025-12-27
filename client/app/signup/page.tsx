"use client";

import { Check, Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const LoginPage = () => {
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const confirmPasswordInput = useRef<HTMLInputElement>(null);

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({
            ...loginFormData,
            [e.target.name]: e.target.value,
        });
    };

    const passwordsMatch = () => {
        if (loginFormData.password === loginFormData.confirmPassword)
            return true;
        return false;
    };

    const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword((prev) => !prev);
    };
    const handleShowConfirmPassword = (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        e.preventDefault();
        setShowConfirmPassword((prev) => !prev);
    };

    return (
        <div className="w-full h-screen flex-center">
            <form className="p-12 flex-center bg-slate-900/10 border border-slate-600 rounded-xl space-y-6">
                <h4 className="text-sky-600 text-3xl">Create Account</h4>
                <div className="space-y-4">
                    <label htmlFor="email">Email:</label>
                    <div
                        className="flex gap-2 py-2 px-4 bg-slate-900 rounded-4xl border border-black focus-within:border-sky-700 shadow-xl transition-all ease-in-out"
                        onClick={() => emailInput.current?.focus()}
                    >
                        <Mail />
                        <input
                            type="email"
                            name="email"
                            ref={emailInput}
                            value={loginFormData.email}
                            onChange={handleFormChange}
                            id="email"
                            className="w-full h-full outline-none"
                        />
                    </div>
                    <label htmlFor="password">Password:</label>
                    <div
                        className="flex gap-2 py-2 px-4 bg-slate-900 rounded-4xl border border-black focus-within:border-sky-700 shadow-xl transition-all ease-in-out"
                        onClick={() => passwordInput.current?.focus()}
                    >
                        <Lock />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            ref={passwordInput}
                            value={loginFormData.password}
                            onChange={handleFormChange}
                            id="password"
                            className="w-full h-full outline-none"
                        />
                        <button onClick={handleShowPassword}>
                            {showPassword ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                    <div
                        className={`${loginFormData.password.length !== 0 ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"} transition-all ease-in-out duration-300`}
                    >
                        <label htmlFor="confirm-password">
                            Confirm Password:
                        </label>
                        <div
                            className="flex gap-2 py-2 px-4 bg-slate-900 rounded-4xl border border-black focus-within:border-sky-700 shadow-xl transition-all ease-in-out"
                            onClick={() =>
                                confirmPasswordInput.current?.focus()
                            }
                        >
                            {passwordsMatch() ? (
                                <Check className="text-sky-500" />
                            ) : (
                                <X className="text-red-500" />
                            )}
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                ref={confirmPasswordInput}
                                value={loginFormData.confirmPassword}
                                onChange={handleFormChange}
                                id="confirm-password"
                                className="w-full h-full outline-none"
                            />
                            <button onClick={handleShowConfirmPassword}>
                                {showConfirmPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-xl bg-sky-800 hover:bg-sky-700 hover:-translate-y-1 transition-all ease-in-out"
                >
                    Create Account
                </button>
                <div className="text-center">
                    <p>Already have an account?</p>
                    <Link
                        href="/login"
                        className="text-sky-700 hover:text-sky-500 transition-all ease-in-out"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
};
export default LoginPage;
