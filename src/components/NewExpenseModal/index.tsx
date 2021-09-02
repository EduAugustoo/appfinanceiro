import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import { useExpenses } from "../../hooks/useExpenses";
import { Container } from "./styles";

interface INewExpenseModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function NewExpenseModal({
  isOpen,
  onRequestClose,
}: INewExpenseModalProps): JSX.Element {
  const { createExpense } = useExpenses();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);

  async function handleCreateNewExpense(event: FormEvent) {
    event.preventDefault();

    await createExpense({
      name,
      description,
      value,
    });

    setName("");
    setValue(0);
    setDescription("");
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewExpense}>
        <h2>Cadastrar despesa</h2>
        <input
          placeholder="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Descrição"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
