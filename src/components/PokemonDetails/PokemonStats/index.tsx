import React from 'react';
import { Stats } from '../../../models/Pokemon';

import { Container } from './styles';

interface Props {
  stats: Stats[];
}

const PokemonStats: React.FC<Props> = ({ stats }) => {
  return (
    <Container>
      <h4>Stats:</h4>
      {stats.map(({ base_stat, stat: { name } }) => (
        <div key={name}>
          <strong>{name}</strong>
          <p>{base_stat}</p>
        </div>
      ))}
    </Container>
  );
};

export default PokemonStats;
