import { PokemonListType } from '../models/Pokemon';
import api from './api';

const path = 'pokemon';

const MAX_POKEMON = 898;

export interface GetPokemonListType {
  count: number;
  next: string;
  previous: null;
  results: PokemonListType[];
}

export const getPokemonsService = (limit = MAX_POKEMON) =>
  api
    .get<GetPokemonListType>(path, {
      params: { limit }
    })
    .then(({ data }) => data);
