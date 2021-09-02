import { IUser } from "../types/types";
import { api } from "./api";

type IUserInput = Omit<IUser, "id" | "name">;

interface IResponse {
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}

export const signIn = async (user: IUserInput): Promise<IResponse> => {
  const response = await api.post("sessions", {
    ...user,
  });

  return response.data;
};
