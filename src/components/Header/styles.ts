import styled from "styled-components";

export const Container = styled.header`
  background: var(--black);
  margin-bottom: 3rem;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 1.25rem 1rem 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    color: var(--white);
    background: var(--black);
    font-size: 2rem;
    border: none;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;
