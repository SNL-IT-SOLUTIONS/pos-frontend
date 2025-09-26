import { createContext, useState, useEffect } from "react";

type UserContextType = {
    userData: any;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: any }) => {
    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
