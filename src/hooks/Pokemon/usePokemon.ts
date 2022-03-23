import { Pokemon } from './../../models/Pokemon';
import { PokemonContext } from './../../context/PokemonContext';
import { useCallback, useContext, useMemo } from 'react';

const getSpriteName = (
  isFemale: boolean,
  isShiny: boolean,
  suffix = 'front'
) => {
  let name = suffix;
  if (!isFemale && !isShiny) {
    return `${name}_default`;
  }
  if (isShiny) {
    name += '_shiny';
  }
  if (isFemale) {
    name += '_female';
  }
  return name;
};

export const usePokemon = (pokemon: Pokemon) => {
  const { isFemale, isShiny } = useContext(PokemonContext);

  const frontImage = useMemo(() => {
    const sprites = (pokemon.sprites || {}) as {
      [key: string]: string | null | undefined;
    };

    const spriteName = getSpriteName(isFemale, isShiny);
    return (
      sprites[spriteName] ?? sprites.front_default ?? ''
    );
  }, [isFemale, isShiny, pokemon]);

  const backImage = useMemo(() => {
    const sprites = (pokemon.sprites || {}) as {
      [key: string]: string | null | undefined;
    };

    const spriteName = getSpriteName(
      isFemale,
      isShiny,
      'back'
    );
    return (
      sprites[spriteName] ?? sprites.front_default ?? ''
    );
  }, [isFemale, isShiny, pokemon]);

  return { frontImage, backImage };
};
