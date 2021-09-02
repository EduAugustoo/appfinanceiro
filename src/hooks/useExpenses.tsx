import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import { api } from "../services/api";
import { IExpense } from "../types/types";
import { useAuth } from "./useAuth";

type ExpenseInput = Omit<IExpense, "id" | "createdAt">;

interface IExpensesProviderProps {
  children: ReactNode;
}

interface IExpensesContextData {
  expenses: IExpense[];
  createExpense: (expense: ExpenseInput) => Promise<void>;
}

const ExpensesContext = createContext<IExpensesContextData>(
  {} as IExpensesContextData
);

export function ExpensesProvider({
  children,
}: IExpensesProviderProps): JSX.Element {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    api
      .get(`users/${user?.id}/movements`)
      .then((response) => setExpenses(response.data));
  }, []);

  async function createExpense(expenseInput: ExpenseInput) {
    const response = await api.post(`users/${user?.id}/movements`, {
      ...expenseInput,
    });
    const expense = response.data;

    setExpenses([expense, ...expenses]);
  }

  return (
    <ExpensesContext.Provider value={{ expenses, createExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses(): IExpensesContextData {
  return useContext(ExpensesContext);
}
