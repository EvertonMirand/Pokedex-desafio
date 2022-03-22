import { useCallback } from 'react';
import { getPokemonsService } from '../service/pokemon';

export const usePokemon = () => {
  const getPokemons = useCallback(
    (limit?: number) => getPokemonsService(limit),
    []
  );

  return {
    getPokemons
  };
};
