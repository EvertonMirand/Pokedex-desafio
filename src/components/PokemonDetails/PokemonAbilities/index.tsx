import React from 'react';
import { Ability } from '../../../models/Pokemon';

interface Props {
  abilities: Ability[];
}

const PokemonAbilities: React.FC<Props> = ({
  abilities
}) => {
  return (
    <div>
      <h4>Abilities:</h4>
      <div>
        {abilities.map(
          ({ ability: { name }, is_hidden }) => (
            <p key={name}>
              {name}
              {is_hidden ? ' hidden ability' : ''}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default PokemonAbilities;
