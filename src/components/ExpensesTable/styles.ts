import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;

  div {
    width: 100%;

    .tableLabel {
      display: block;
      text-align: center;
      font-family: "Roboto", sans-serif;
      font-weight: 700;
      font-size: 2rem;
    }

    table {
      width: 100%;
      border-spacing: 0 0.5rem;
      padding: 2rem;

      th {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-size: 2rem;
        text-align: left;
        border-bottom: 2px solid var(--black);
      }

      td {
        border-bottom: 1px solid var(--black);
      }

      tfoot {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        color: var(--red);
      }
    }
  }
`;
