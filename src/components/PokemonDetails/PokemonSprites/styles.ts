import styled, { css } from 'styled-components';
import { Button } from '../../shared/DefaultButton/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border-radius: 10px;
  padding: 30px;
  background: blue;
  margin-top: 10px;
`;

export const ChoseSpriteButton = styled(Button)`
  background: ${({ disabled }) =>
    disabled ? '#ccc' : '#fff'};
  color: #000;
  border-radius: 5px;
  ${({ disabled }) =>
    !disabled &&
    css`
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.02);
      }
    `}
`;

export const ButtonSpriteContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;

  margin-top: 10px;
  margin-bottom: 10px;
`;

export const OptionSpriteContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;
