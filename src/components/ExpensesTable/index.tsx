import {
  Box,
  Icon,
  Flex,
  Heading,
  Select,
  Table,
  Tbody,
  Tfoot,
  Thead,
  Th,
  Tr,
  Td,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  AlertDialogHeader,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaTimes, FaPen } from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";
import { api } from "../../services/api";
import { IExpense, IUser } from "../../types/types";

interface IExpensesTableProps {
  onOpenEditExpenseModal: (expense: IExpense) => void;
}
interface IMovement {
  expenses: IExpense[];
  total: number;
}

type IUserType = Omit<IUser, "password">;

export default function ExpensesTable({
  onOpenEditExpenseModal,
}: IExpensesTableProps): JSX.Element {
  const toast = useToast();
  const { user } = useAuth();
  const cancelRef = useRef(null);
  const { expenses, totalExpenses, deleteExpense, getExpenses } = useExpenses();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [expenseId, setExpenseId] = useState<string>("");
  const [users, setUsers] = useState<IUserType[]>([]);
  const [tableUser, setTableUser] = useState<string>(user?.id as string);
  const [movements, setMovements] = useState<IMovement>({
    expenses: [],
    total: 0,
  });

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      const { data: users } = await api.get("/users");

      setUsers(users);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const movement: IMovement = {
      expenses: [...expenses],
      total: 0,
    };

    movement.total = movement.expenses.reduce(
      (acc, expense) => acc + expense.value,
      0
    );

    setMovements(movement);
  }, [expenses]);

  function handleDeleteExpense(id: string): void {
    if (user?.id !== tableUser) {
      toast({
        title: "Erro",
        description: "Não é possível excluir a despesa de outro usuário",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setExpenseId(id);
      setIsAlertDialogOpen(true);
    }
  }

  async function handleEditExpense(expense: IExpense): Promise<void> {
    if (user?.id !== tableUser) {
      toast({
        title: "Erro",
        description: "Não é possível editar a despesa de outro usuário",
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    } else {
      onOpenEditExpenseModal(expense);
    }
  }

  async function handleChangeUser(
    event: ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    const newTableUser = event.target.value;
    setTableUser(newTableUser);
    await getExpenses(newTableUser);
  }

  return (
    <Flex maxW="1120px" m="0 auto" justify="space-around" align="center">
      <Box w="100%">
        <Flex mb="2rem" align="baseline" justify="center">
          <Heading textAlign="center" fontWeight="700" fontSize="2rem">
            Despesas
          </Heading>
          <Select
            w="auto"
            textAlign="center"
            m="0 0.5rem"
            variant="flushed"
            fontWeight="700"
            fontSize="2rem"
            _hover={{ filter: "brightness(0.8)", cursor: "pointer" }}
            value={tableUser}
            onChange={handleChangeUser}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </Flex>
        <Table w="100%" p="2rem" variant="striped">
          <Thead>
            <Tr borderBottom="2px solid">
              <Th>Despesa</Th>
              <Th>Descrição</Th>
              <Th isNumeric>Valor</Th>
              <Th>Ação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {movements.expenses.map((expense) => (
              <Tr key={expense.id}>
                <Td>{expense.name}</Td>
                <Td>{expense.description}</Td>
                <Td isNumeric>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(expense.value)}
                </Td>
                <Td>
                  <Icon
                    mr="0.5rem"
                    as={FaPen}
                    color="gray.600"
                    transition="filter 0.2s"
                    _hover={{ filter: "brightness(0.8)", cursor: "pointer" }}
                    onClick={() => {
                      handleEditExpense(expense);
                    }}
                  />
                  <Icon
                    as={FaTimes}
                    color="red.900"
                    transition="filter 0.2s"
                    _hover={{ filter: "brightness(0.8)", cursor: "pointer" }}
                    onClick={() => {
                      handleDeleteExpense(expense.id);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot fontWeight="700" color="red.900">
            <Tr>
              <Td colSpan={2}>Total</Td>
              <Td isNumeric>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(movements.total)}
              </Td>
              <Td>{((movements.total / totalExpenses) * 100).toFixed(2)}%</Td>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      <AlertDialog
        isOpen={isAlertDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertDialogOpen(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Despesa
            </AlertDialogHeader>
            <AlertDialogBody>
              Deseja realmente excluir a despesa?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                mr="1rem"
                colorScheme="red"
                onClick={async () => {
                  deleteExpense(expenseId);
                  setIsAlertDialogOpen(false);
                }}
              >
                Sim
              </Button>
              <Button
                ref={cancelRef}
                onClick={() => setIsAlertDialogOpen(false)}
              >
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}
