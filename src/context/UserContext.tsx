// MenuContext.tsx
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface UserContextType {
    currentUserId: string;
    setCurrentUserId: Dispatch<SetStateAction<string>>;
}
interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType>({
    currentUserId: '',
    setCurrentUserId: () => { },
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [currentUserId, setCurrentUserId] = useState("12");



    return (
        <UserContext.Provider value={{ currentUserId, setCurrentUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;