import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";
import { IExpense } from "../../types/types";
import { Container } from "./styles";

interface IMovement {
  expenses: IExpense[];
  total: number;
}

export default function ExpensesTable(): JSX.Element {
  const { user } = useAuth();
  const { expenses } = useExpenses();
  const [movements, setMovements] = useState<IMovement>({
    expenses: [],
    total: 0,
  });

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

  return (
    <Container>
      <div>
        <h1 className="tableLabel">Despesas {user?.name}</h1>
        <table>
          <thead>
            <tr>
              <th>Despesa</th>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {movements.expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.description}</td>
                <td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(expense.value)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total</td>
              <td>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(movements.total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Container>
  );
}
