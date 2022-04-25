import type { GetServerSideProps, NextPage } from 'next';

import { getPokemonsService } from '../service/pokemon';

import { useHome } from '../hooks/Home/useHome';
import {
  HomeContainer,
  HomeContent,
  PokemonListContainer
} from '../styles/HomeStyles';
import PokemonItem from '../components/Home/PokemonItem';
import LoadMoreButton from '../components/Home/LoadMoreButton';
import { DefaultInput } from '../components/shared/DefaultInput/styles';
import Head from 'next/head';
import HasErroContainer from '../components/shared/HasErroContainer';

export interface ModifyPokemonType {
  name: string;
  modifyName: string;
  id: number;
  url: string;
  image: string;
}

interface Props {
  pokemons: ModifyPokemonType[];
  error?: string;
}

const Home: NextPage<Props> = ({ pokemons, error }) => {
  const {
    onChangeDebounce,
    pokemonSeeingList,
    pokemonsFiltered,
    onClickLoadMore
  } = useHome(pokemons);

  return (
    <HasErroContainer error={error}>
      <Head>
        <title>Search Pokemon</title>
      </Head>
      <HomeContainer>
        <HomeContent>
          <DefaultInput
            placeholder="Type a name to search"
            onChange={onChangeDebounce}
            type="text"
            data-testid="search-name-input"
          />
          <PokemonListContainer>
            {pokemonSeeingList.map((pokemon) => (
              <PokemonItem {...pokemon} key={pokemon.id} />
            ))}
          </PokemonListContainer>
          <LoadMoreButton
            showButton={
              pokemonsFiltered.length >
              pokemonSeeingList.length
            }
            onClick={onClickLoadMore}
          />
        </HomeContent>
      </HomeContainer>
    </HasErroContainer>
  );
};

export const getServerSideProps: GetServerSideProps =
  async () => {
    try {
      const { results = [] } = await getPokemonsService();

      return {
        props: {
          pokemons: results.map<ModifyPokemonType>(
            ({ name, url }, index) => ({
              name,
              modifyName: name.split('-').join(' '),
              id: index + 1,
              url,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`
            })
          )
        }
      };
    } catch ({ message }) {
      return {
        props: {
          error: message || 'An unexpected error ocurred'
        }
      };
    }
  };

export default Home;
