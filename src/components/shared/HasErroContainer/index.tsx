import React, { Fragment } from 'react';

interface Props {
  error?: string | null;
}

const HasErroContainer: React.FC<Props> = ({
  error,
  children
}) => {
  if (error) {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }
  return <Fragment>{children}</Fragment>;
};

export default HasErroContainer;
