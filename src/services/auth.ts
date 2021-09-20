import { destroyCookie } from "nookies";

import { IUser } from "../types/types";
import { api } from "./api";

type IUserInput = Omit<IUser, "id" | "name">;

interface IResponse {
  token: string;
  refreshToken: string;
}

const signIn = async (user: IUserInput): Promise<IResponse> => {
  const response = await api.post("auth/session", {
    ...user,
  });

  return response.data;
};

const refreshToken = async (): Promise<IResponse> => {
  const response = await api.post("auth/session/refreshToken");
  return response.data;
};

const signOut = async (): Promise<void> => {
  await api.post("auth/session/signout");
  destroyCookie(null, "appfin.token");
  destroyCookie(null, "appfin.refreshToken");
};

export { signIn, refreshToken, signOut };
