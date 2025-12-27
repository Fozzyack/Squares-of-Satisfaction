"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRef, useState } from "react";

const LoginPage = () => {
    const emailInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({
            ...loginFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="w-full h-screen flex-center">
            <form className="p-12 flex-center bg-slate-900/10 border border-slate-600 rounded-xl space-y-8">
                <h4 className="text-green-600 text-3xl">Login</h4>
                <div className="space-y-4">
                    <label htmlFor="email">Email:</label>
                    <div
                        className="flex gap-2 py-2 px-4 bg-slate-900 rounded-4xl border border-black focus-within:border-green-700 shadow-xl transition-all ease-in-out"
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
                        className="flex gap-2 py-2 px-4 bg-slate-900 rounded-4xl border border-black focus-within:border-green-700 shadow-xl transition-all ease-in-out"
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
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-xl bg-green-800 hover:bg-green-700 hover:-translate-y-1 transition-all ease-in-out"
                >
                    Login
                </button>
            </form>
        </div>
    );
};
export default LoginPage;
