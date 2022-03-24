import { Pokemon } from './../../models/Pokemon';
import { PokemonContext } from './../../context/PokemonContext';
import { useContext, useMemo, useCallback } from 'react';

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

  const getSpriteUrl = useCallback(
    (suffix = 'front') => {
      const sprites = (pokemon.sprites || {}) as {
        [key: string]: string | null | undefined;
      };

      const spriteName = getSpriteName(
        isFemale,
        isShiny,
        suffix
      );
      const noFemaleSprite = getSpriteName(
        false,
        isShiny,
        suffix
      );

      return (
        sprites[spriteName] ?? sprites[noFemaleSprite] ?? ''
      );
    },
    [isFemale, isShiny, pokemon.sprites]
  );

  const frontImage = useMemo(
    () => getSpriteUrl(),
    [getSpriteUrl]
  );

  const backImage = useMemo(
    () => getSpriteUrl('back'),
    [getSpriteUrl]
  );

  return { frontImage, backImage, getSpriteUrl };
};
