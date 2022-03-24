import React from 'react';
import { Types } from '../../../models/Pokemon';

import { Container, TypesContainer } from './styles';

interface Props {
  types: Types[];
}

const PokemonTypes: React.FC<Props> = ({ types }) => {
  return (
    <Container>
      <h4>Types: </h4>
      <TypesContainer>
        {types.map(({ type: { name } }) => (
          <div key={name}>
            <p>{name}</p>
          </div>
        ))}
      </TypesContainer>
    </Container>
  );
};

export default PokemonTypes;
