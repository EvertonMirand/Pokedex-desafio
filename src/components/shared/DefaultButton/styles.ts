import styled from 'styled-components';

interface ButtonProps {
  color?: string;
  background?: string;
  borderRadius?: number;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  background: ${({ background = 'none' }) => background};
  color: ${({ color = '#fff' }) => color};
  border-radius: ${({ borderRadius = 0 }) =>
    borderRadius}px;

  padding: 10px;
  cursor: ${({ disabled }) =>
    disabled ? 'not-allowed' : 'pointer'};
`;
