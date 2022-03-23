import type { GetServerSideProps, NextPage } from 'next';
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import debounce from 'lodash.debounce';

import { getPokemonsService } from '../service/pokemon';

import { paginate } from '../utils/array';
import {
  HomeContainer,
  HomeContent,
  PokemonListContainer
} from '../styles/HomeStyles';
import PokemonItem from '../components/Home/PokemonItem';
import LoadMoreButton from '../components/Home/LoadMoreButton';
import { DefaultInput } from '../components/shared/DefaultInput/styles';

interface ModifyPokemonType {
  name: string;
  modifyName: string;
  id: number;
  url: string;
}

interface Props {
  pokemons: ModifyPokemonType[];
}

const pageSize = 10;

const Home: NextPage<Props> = ({ pokemons }) => {
  const [currentPage, setPage] = useState(1);

  const [searchName, setSearchName] = useState('');
  const [pokemonSeeingList, setPokemonSeeingList] =
    useState<ModifyPokemonType[]>([]);
  const [pokemonsFiltered, setPokemonsFiltered] = useState<
    ModifyPokemonType[]
  >([]);

  useEffect(() => {
    setPokemonsFiltered(
      pokemons.filter(({ modifyName }) =>
        modifyName.includes(searchName)
      )
    );
  }, [pokemons, searchName]);

  useEffect(() => {
    const newList = paginate(
      pokemonsFiltered,
      currentPage,
      pageSize
    );
    setPokemonSeeingList((list) => [...list, ...newList]);
  }, [currentPage, pokemonsFiltered]);

  const onClickLoadMore = () => {
    setPage((page) => page + 1);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setSearchName(e?.target?.value ?? '');
      setPage(1);
      setPokemonSeeingList([]);
    }, []);

  const onChangeDebounce = useMemo(
    () => debounce(onChange, 200),
    [onChange]
  );

  return (
    <HomeContainer>
      <HomeContent>
        <DefaultInput
          placeholder="Digite um nome a pesquisar"
          onChange={onChangeDebounce}
          type="text"
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
  );
};

export const getServerSideProps: GetServerSideProps =
  async () => {
    const { results = [] } = await getPokemonsService();

    return {
      props: {
        pokemons: results.map<ModifyPokemonType>(
          ({ name, url }, index) => ({
            name,
            modifyName: name.split('-').join(' '),
            id: index + 1,
            url
          })
        )
      }
    };
  };

export default Home;
