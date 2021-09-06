import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, FormEvent, useState, useRef } from "react";

import { useExpenses } from "../../hooks/useExpenses";
import { IExpense } from "../../types/types";
import { Input } from "../Form/Input";
import { NumberInput } from "../Form/NumberInput";

interface INewExpenseModalProps {
  isOpen: boolean;
  expense: IExpense | null;
  onRequestClose: () => void;
}

export default function NewExpenseModal({
  isOpen,
  onRequestClose,
  expense,
}: INewExpenseModalProps): JSX.Element {
  const { createExpense, editExpense } = useExpenses();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const initialRef = useRef(null);

  useEffect(() => {
    setName(expense?.name ?? "");
    setDescription(expense?.description ?? "");
    setValue(expense?.value ?? 0);
  }, [expense]);

  async function handleCreateNewExpense(event: FormEvent) {
    event.preventDefault();

    if (expense?.id) {
      await editExpense({
        id: expense.id,
        name,
        description,
        value,
      });
    } else {
      await createExpense({
        name,
        description,
        value,
      });
    }

    setName("");
    setValue(0);
    setDescription("");
    onRequestClose();
  }

  return (
    <Modal
      size="lg"
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onRequestClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="black.900">
        <ModalHeader color="white.100">Cadastrar Despesa</ModalHeader>
        <ModalCloseButton
          bg="black.900"
          color="white.100"
          _hover={{ filter: "brightness(0.8)", cursor: "pointer" }}
        />
        <ModalBody>
          <Box as="form" onSubmit={handleCreateNewExpense}>
            <Input
              name="Nome"
              placeholder="Nome"
              value={name}
              ref={initialRef}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              name="Nome"
              placeholder="Descrição"
              mt="1rem"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <NumberInput
              name="Valor"
              mt="1rem"
              onChange={(_, numericValue) => setValue(numericValue)}
            />
            <Button float="right" bg="white.100" my="1rem" type="submit">
              Cadastrar
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
