import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { UserContext } from "@/context/UserContext";
import ForgotPassword from "./ForgotPassword";
import api from "@/lib/axios";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUserData } = useContext(UserContext)!;
    const navigate = useNavigate();

    const togglePassword = () => setShowPassword((prev) => !prev);

    const handleButton = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/login", { login, password });
            const data = response.data;

            if (data.isSuccess) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("userRole", data.user.user_type.role_name);

                setUserData(data.user);
                toast.success("Login successful!");

                // Only Admin & Super Admin can login
                if (
                    data.user.user_type.role_name.toLowerCase() === "admin" ||
                    data.user.user_type.role_name.toLowerCase() === "super admin"
                ) {
                    navigate("/admin_dashboard");
                } else {
                    toast.error("Access Denied!");
                    navigate("/");
                }
            } else {
                toast.error("Invalid credentials!");
            }
        } catch (err) {
            toast.error("Incorrect credentials!");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };


    if (showForgotPassword) {
        return <ForgotPassword setShowForgotPassword={setShowForgotPassword} />;
    }

    return (
        <div data-aos="fade-down"

            className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="flex justify-center items-center gap-2">
                        <img src="/little-icon.png" alt="icon" className="w-8 h-8" />
                        <span className="text-lg font-semibold text-gray-700">SNL POS</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-light text-gray-900">Welcome back</h1>
                        <p className="text-gray-500 mt-1">Sign in to your account</p>
                    </div>
                </div>

                {/* Login Form */}
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                        <form className="space-y-4" onSubmit={handleButton}>
                            <div>
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    className="h-11"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-11 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <Eye className="h-4 w-4" />
                                    ) : (
                                        <EyeClosed className="h-4 w-4" />
                                    )}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11"
                                disabled={loading}
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </Button>
                        </form>

                        <div className="mt-4 text-center">
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-sm hover:cursor-pointer text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Forgot your password?
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Simplified Brand Element */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-gray-400">
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <span className="text-xs">SNL POS SYSTEM</span>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;