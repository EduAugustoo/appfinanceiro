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
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
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
  const { user } = useAuth();
  const { expenses, deleteExpense, getExpenses } = useExpenses();
  const [users, setUsers] = useState<IUserType[]>([]);
  const [tableUser, setTableUser] = useState<string>(user?.name as string);
  const [movements, setMovements] = useState<IMovement>({
    expenses: [],
    total: 0,
  });

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      const response = await api.get("/users");
      setUsers(response.data);
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

  async function handleDeleteExpense(id: string): Promise<void> {
    await deleteExpense(id);
  }

  async function handleEditExpense(expense: IExpense): Promise<void> {
    onOpenEditExpenseModal(expense);
  }

  async function handleChangeUser(
    event: ChangeEvent<HTMLSelectElement>
  ): Promise<void> {
    const { selectedIndex } = event.target;
    const selectedUser = event.target[selectedIndex].textContent as string;
    setTableUser(selectedUser);
    await getExpenses(event.target.value);
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
            defaultValue={tableUser}
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
            </Tr>
          </Tfoot>
        </Table>
      </Box>
    </Flex>
  );
}
