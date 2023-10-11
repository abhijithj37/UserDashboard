import {
  UserContextProviderProps,
  UserContextType,
  Users,
} from "../Types/type";
import { createContext, useState, useContext } from "react";

export const UserContext = createContext<UserContextType | null>(null);

const UserDataProvider = ({ children }: UserContextProviderProps) => {
  const [users, setUsers] = useState<Users>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        loading,
        setLoading,
        totalUsers,
        setTotalUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserDataProvider;

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserDataProvider");
  }

  return context;
};
