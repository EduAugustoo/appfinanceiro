import { useState } from "react";
import Modal from "react-modal";

import { ExpensesProvider } from "../../hooks/useExpenses";
import ExpensesTable from "../ExpensesTable";
import Header from "../Header";
import NewExpenseModal from "../NewExpenseModal";

Modal.setAppElement("#root");

export default function Dashboard(): JSX.Element {
  const [isNewExpenseModalOpen, setIsNewExpenseModalOpen] = useState(false);

  function handleOpenNewExpenseModal() {
    setIsNewExpenseModalOpen(true);
  }

  function handleCloseNewExpenseModal() {
    setIsNewExpenseModalOpen(false);
  }

  return (
    <ExpensesProvider>
      <Header onOpenAddExpenseModal={handleOpenNewExpenseModal} />
      <ExpensesTable />
      <NewExpenseModal
        isOpen={isNewExpenseModalOpen}
        onRequestClose={handleCloseNewExpenseModal}
      />
    </ExpensesProvider>
  );
}
