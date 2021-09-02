import { useState, createContext, useContext, ReactNode } from "react";

import * as auth from "../services/auth";
import { IUser } from "../types/types";

type IAuthInput = Omit<IUser, "id" | "name">;
type IAuthUser = Omit<IUser, "password">;

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  signed: boolean;
  user: IAuthUser | null;
  signIn(user: IAuthInput): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
  const [user, setUser] = useState<IAuthUser | null>(() => {
    const storagedUser = localStorage.getItem("@appfin:user");
    if (storagedUser) {
      return JSON.parse(storagedUser);
    }
    return null;
  });

  async function signIn(authUser: IAuthInput): Promise<void> {
    const response = await auth.signIn(authUser);
    setUser(response.user);
    localStorage.setItem("@appfin:token", response.token);
    localStorage.setItem("@appfin:user", JSON.stringify(response.user));
  }

  function signOut(): void {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContextData {
  return useContext(AuthContext);
}
