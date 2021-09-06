import {
  Box,
  Button,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaDollarSign, FaLock, FaUser } from "react-icons/fa";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { queryClient } from "../../services/queryClient";
import { IUser } from "../../types/types";
import { Input } from "../Form/Input";

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
    <Flex h="100vh" m="0 auto" justify="center" align="center">
      <VStack
        as="form"
        action="/"
        method="post"
        spacing="1rem"
        w="20%"
        p="2rem 1rem"
        bg="black.900"
        borderRadius="0.75rem"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Icon as={FaDollarSign} color="white.100" mb="2rem" fontSize="2rem" />
        <Box w="100%">
          <InputGroup>
            <InputLeftElement h="100%" pointerEvents="none">
              <FaUser color="black.900" />
            </InputLeftElement>
            <Input
              id="username"
              pl="2.5rem"
              placeholder="Informe seu usuário"
              type="text"
              {...register("username")}
            />
          </InputGroup>
        </Box>
        <Box w="100%">
          <InputGroup>
            <InputLeftElement h="100%" pointerEvents="none">
              <FaLock color="black.900" />
            </InputLeftElement>
            <Input
              id="password"
              pl="2.5rem"
              placeholder="Informe sua senha"
              type="password"
              {...register("password")}
            />
          </InputGroup>
        </Box>
        <Flex color="white.100" justify="center" w="100%" mb="1rem">
          <Button
            type="submit"
            w="100%"
            mt="1rem"
            color="white.100"
            bg="gray.600"
            fontWeight="700"
            border="none"
            borderRadius="0.5rem"
            p="0.5rem"
          >
            Entrar
          </Button>
        </Flex>
      </VStack>
    </Flex>
  );
}
