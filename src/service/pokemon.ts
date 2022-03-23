import {
  Pokemon,
  PokemonListType
} from '../models/Pokemon';
import api from './api';

const path = 'pokemon';

const MAX_POKEMON = 10000;

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

export const getPokemonService = (name = '') =>
  api
    .get<Pokemon>(`${path}/${name}`)
    .then(({ data }) => data);
