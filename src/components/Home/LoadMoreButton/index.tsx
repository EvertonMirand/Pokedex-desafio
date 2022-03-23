import React from 'react';
import { Button } from '../../shared/DefaultButton/styles';

interface Props {
  showButton: boolean;
  onClick: () => void;
}

const LoadMoreButton: React.FC<Props> = ({
  showButton,
  onClick
}) => {
  return showButton ? (
    <Button
      onClick={onClick}
      background="#0a0"
      borderRadius={5}
    >
      Carregar mais
    </Button>
  ) : null;
};

export default LoadMoreButton;
