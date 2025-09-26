import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";
import api from "@/lib/axios";

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ForgotPasswordProps = {
    setShowForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setShowForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Replace with your actual API endpoint
            await api.post("/auth/forgot-password", { email });
            setEmailSent(true);
            toast.success("Password reset email sent!");
        } catch (err) {
            toast.error("Error sending reset email");
            console.error("Forgot password error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50">
            <div className="max-w-md w-full space-y-6">
                {/* Back Button and Header */}
                <div className="text-center space-y-4">


                    <div className="space-y-2">
                        <div className="flex justify-center items-center gap-2">
                            <img src="/little-icon.png" alt="icon" className="w-8 h-8" />
                            <span className="text-lg font-semibold text-gray-700">SNL POS</span>
                        </div>
                        <h1 className="text-2xl font-light text-gray-900">
                            {emailSent ? "Check your email" : "Reset your password"}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {emailSent
                                ? "We've sent instructions to your email"
                                : "Enter your email to receive reset instructions"
                            }
                        </p>
                    </div>
                </div>

                {/* Reset Form */}
                {!emailSent ? (
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-6">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-11 pl-10"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11"
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Send reset instructions"}
                                </Button>
                                <button
                                    onClick={() => setShowForgotPassword(false)}
                                    className="hover:cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mx-auto"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to login
                                </button>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    /* Success State */
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="font-medium text-gray-900 mb-2">Check your inbox</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                We've sent password reset instructions to <strong>{email}</strong>
                            </p>
                            <Button
                                onClick={() => setShowForgotPassword(false)}
                                className="w-full h-11"
                            >
                                Return to login
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Help Text */}
                {!emailSent && (
                    <div className="text-center">
                        <p className="text-xs text-gray-400">
                            Don't have an account? Contact your administrator
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;