import { SubmitHandler, useForm } from "react-hook-form";
import { FaDollarSign } from "react-icons/fa";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { queryClient } from "../../services/queryClient";
import { GlobalStyle } from "../../styles/global";
import { IUser } from "../../types/types";
import { Container, Content } from "./styles";

type IUserInput = Omit<IUser, "id" | "name">;

export function Login(): JSX.Element {
  const history = useHistory();
  const { signIn } = useAuth();
  const { register, handleSubmit } = useForm<IUserInput>();

  const logIn = useMutation(
    async (user: IUserInput) => {
      await signIn(user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("sessions");
      },
    }
  );

  const handleSignIn: SubmitHandler<IUserInput> = async (user: IUserInput) => {
    await logIn.mutateAsync(user);
    history.push("/");
  };

  return (
    <Container>
      <Content action="/" method="post" onSubmit={handleSubmit(handleSignIn)}>
        <FaDollarSign className="logo" />
        <div>
          <input
            placeholder="Informe seu usuário"
            type="text"
            id="username"
            {...register("username")}
          />
        </div>
        <div>
          <input
            placeholder="Informe sua senha"
            type="password"
            id="password"
            {...register("password")}
          />
        </div>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </Content>
      <GlobalStyle />
    </Container>
  );
}
