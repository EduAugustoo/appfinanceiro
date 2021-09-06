import { useState } from "react";
import Modal from "react-modal";

import { ExpensesProvider } from "../../hooks/useExpenses";
import { IExpense } from "../../types/types";
import ExpensesTable from "../ExpensesTable";
import Header from "../Header";
import NewExpenseModal from "../NewExpenseModal";

Modal.setAppElement("#root");

export default function Dashboard(): JSX.Element {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expense, setExpense] = useState<IExpense | null>(null);

  function handleOpenExpenseModal(expense: IExpense | null) {
    setIsExpenseModalOpen(true);
    setExpense(expense);
  }

  function handleCloseExpenseModal() {
    setIsExpenseModalOpen(false);
  }

  return (
    <ExpensesProvider>
      <Header onOpenAddExpenseModal={handleOpenExpenseModal} />
      <ExpensesTable onOpenEditExpenseModal={handleOpenExpenseModal} />
      <NewExpenseModal
        isOpen={isExpenseModalOpen}
        onRequestClose={handleCloseExpenseModal}
        expense={expense}
      />
    </ExpensesProvider>
  );
}
