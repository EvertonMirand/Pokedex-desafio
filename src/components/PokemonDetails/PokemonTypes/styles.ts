import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;

  strong {
    color: #eee;
  }
`;

export const TypesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
