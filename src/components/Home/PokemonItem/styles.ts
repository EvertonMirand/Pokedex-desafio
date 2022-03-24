import styled from 'styled-components';

export const Container = styled.button`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;

  cursor: pointer;

  list-style-type: none;
  text-align: center;
  justify-content: center;
  align-items: center;

  background-color: #fff;
  color: #005023;
  border-radius: 5px;
  padding: 20px;
  border: none;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

export const PokemonNameText = styled.h2`
  text-align: center;
`;
