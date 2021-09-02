import { FaDollarSign, FaSignOutAlt } from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";
import { Container, Content } from "./styles";

interface IHeaderProps {
  onOpenAddExpenseModal: () => void;
}

export default function Header({
  onOpenAddExpenseModal,
}: IHeaderProps): JSX.Element {
  const { signOut } = useAuth();
  return (
    <Container>
      <Content>
        <div>
          <button type="button" onClick={onOpenAddExpenseModal}>
            <FaDollarSign title="Nova despesa" color="#FFF" />
          </button>
          <button type="button" onClick={onOpenAddExpenseModal}>
            <FaDollarSign title="Nova despesa" color="#FFF" />
          </button>
        </div>
        <button type="button" onClick={signOut}>
          <FaSignOutAlt title="Log out" color="#FFF" />
        </button>
      </Content>
    </Container>
  );
}
