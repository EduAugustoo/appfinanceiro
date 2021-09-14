/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FaDollarSign, FaPowerOff } from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";
import { IExpense } from "../../types/types";

interface IHeaderProps {
  onOpenAddExpenseModal: (expense: IExpense | null) => void;
}

export default function Header({
  onOpenAddExpenseModal,
}: IHeaderProps): JSX.Element {
  const { signOut, user } = useAuth();
  const { totalExpenses } = useExpenses();

  function handleNewExpense() {
    onOpenAddExpenseModal(null);
  }

  return (
    <Box bg="black.900" mb="3rem" align="center">
      <Flex maxW="1120px" p="1rem" align="center" justify="space-between">
        <Flex align="center" justify="space-between" color="white.100">
          <Tooltip label="Nova Despesa">
            <IconButton
              isRound
              aria-label="Nova Despesa"
              mr="1.5rem"
              icon={<FaDollarSign />}
              fontSize="2rem"
              transition="filter 0.2s"
              _hover={{ filter: "brightness(0.8)", cursor: "pointer" }}
              onClick={handleNewExpense}
            />
          </Tooltip>
          <Heading size="md">
            Total{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalExpenses)}
          </Heading>
        </Flex>
        <Flex align="center" justify="space-between">
          <Flex color="white.100" align="center" justify="space-between">
            <Avatar
              size="sm"
              name={user?.name}
              bg="white.100"
              color="black.900"
              mr="0.5rem"
            />
            <Heading size="sm">{user?.name}</Heading>
          </Flex>
          <Tooltip label="Sair">
            <IconButton
              isRound
              size="sm"
              ml="1.5rem"
              aria-label="Sair"
              icon={<FaPowerOff />}
              transition="filter 0.2s"
              _hover={{ filter: "brightness(0.8)", cursor: "pointer" }}
              onClick={signOut}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
}
