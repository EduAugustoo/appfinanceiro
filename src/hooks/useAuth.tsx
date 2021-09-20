import jwtDecode from "jwt-decode";
import { setCookie, parseCookies } from "nookies";
import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";

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
  const [user, setUser] = useState<IAuthUser | null>(null);

  useEffect(() => {
    const { "appfin.token": decodedToken } = parseCookies();
    if (decodedToken) {
      const { id, name, username } = jwtDecode(decodedToken) as IAuthUser;
      setUser({ id, name, username });
      // api.defaults.headers.Authorization = `Bearer ${decodedToken}`;
    } else {
      setUser(null);
    }
  }, []);

  async function signIn(authUser: IAuthInput): Promise<void> {
    const { token, refreshToken } = await auth.signIn(authUser);
    const { id, name, username } = jwtDecode(token) as IAuthUser;
    setCookie(null, "appfin.token", token, {
      path: "/",
      secure: true,
      sameSite: "none",
    });
    setCookie(null, "appfin.refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: "none",
    });
    setUser({ id, name, username });
  }

  async function signOut(): Promise<void> {
    await auth.signOut();
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
