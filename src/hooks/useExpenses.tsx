import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { api } from "../services/api";
import { IExpense, IUser } from "../types/types";
import { useAuth } from "./useAuth";

type IExpenseCreateInput = Omit<IExpense, "id" | "createdAt">;
type IExpenseEditInput = Omit<IExpense, "createdAt">;

interface IExpensesProviderProps {
  children: ReactNode;
}

interface IExpensesContextData {
  expenses: IExpense[];
  totalExpenses: number;
  createExpense: (expense: IExpenseCreateInput) => Promise<void>;
  editExpense: (expense: IExpenseEditInput) => Promise<void>;
  getExpenses: (id: string) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

const ExpensesContext = createContext<IExpensesContextData>(
  {} as IExpensesContextData
);

export function ExpensesProvider({
  children,
}: IExpensesProviderProps): JSX.Element {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  useEffect(() => {
    api.get("/users").then(({ data: users }) => {
      const movements = users.flatMap((user: IUser) => user.__movements__);
      const totalExpenses = movements.reduce(
        (acc: number, mov: IExpense) => acc + mov.value,
        0
      );
      setTotalExpenses(totalExpenses);
    });
  }, []);

  useEffect(() => {
    api.get(`users/${user?.id}/movements`).then((response) => {
      setExpenses(response.data);
    });
  }, []);

  async function createExpense(
    expenseInput: IExpenseCreateInput
  ): Promise<void> {
    const { data } = await api.post(`users/${user?.id}/movements`, {
      ...expenseInput,
    });
    const expense: IExpense = data;

    setTotalExpenses(totalExpenses + expense.value);
    setExpenses([expense, ...expenses]);
  }

  async function getExpenses(id: string) {
    const response = await api.get(`/users/${id}/movements`);
    setExpenses(response.data);
  }

  async function deleteExpense(id: string): Promise<void> {
    await api.delete(`users/${user?.id}/movements/${id}`);
    const response = await api.get(`users/${user?.id}/movements`);
    setExpenses(response.data);
  }

  async function editExpense(expense: IExpenseEditInput): Promise<void> {
    await api.put(`users/${user?.id}/movements/${expense.id}`, {
      ...expense,
    });
    const response = await api.get(`users/${user?.id}/movements`);
    setExpenses(response.data);
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        totalExpenses,
        createExpense,
        editExpense,
        deleteExpense,
        getExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses(): IExpensesContextData {
  return useContext(ExpensesContext);
}
