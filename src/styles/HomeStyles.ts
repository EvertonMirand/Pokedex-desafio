import styled from 'styled-components';

export const HomeContainer = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;

  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

export const HomeContent = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
  max-width: 1600px;
`;

export const PokemonListContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5px;
  margin-top: 30px;
  margin-bottom: 20px;
  max-width: 500px;
  width: 80%;
`;
