import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext"

const ProtectedRoute = ({ allowedRoles, children }: { allowedRoles: string[]; children: any }) => {
    const context = useContext(UserContext);
    const [isChecking, setIsChecking] = useState(true);

    if (!context) {
        return <Navigate to="/" replace />; // if context is missing
    }

    const { userData } = context;

    const getRole = () => {
        const contextRole = userData?.user_type?.role_name?.toLowerCase();
        if (contextRole) return contextRole;

        const storedRole = localStorage.getItem("userRole");
        if (storedRole) return storedRole.toLowerCase();

        const sessionRole = sessionStorage.getItem("userRole");
        if (sessionRole) return sessionRole.toLowerCase();

        return null;
    };

    const role = getRole();

    useEffect(() => {
        if (userData?.user_type?.role_name && !localStorage.getItem("userRole")) {
            localStorage.setItem("userRole", userData.user_type.role_name);
        }
        setIsChecking(false);
    }, [userData]);

    if (isChecking) {
        return <div>Loading...</div>;
    }

    if (!role) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.map((r) => r.toLowerCase()).includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
