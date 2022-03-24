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
      background="#fff"
      color="#000"
      borderRadius={5}
      data-testid="load-more-btn"
    >
      Load more
    </Button>
  ) : null;
};

export default LoadMoreButton;
