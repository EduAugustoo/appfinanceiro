import styled from "styled-components";

export const Container = styled.main`
  max-width: 1190px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.form`
  width: 25%;
  padding: 2rem 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: var(--black);
  border-radius: 0.75rem;

  .logo {
    color: var(--white);
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  div {
    color: var(--white);
    display: flex;
    justify-content: center;
    width: 100%;

    &:nth-child(2) {
      margin-bottom: 1rem;
    }

    input {
      text-align: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: none;
      width: 85%;
    }

    button {
      margin-top: 1rem;
      color: var(--white);
      background-color: var(--grey);
      font-weight: 700;
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem;
      width: 85%;
      text-decoration: none;

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`;
