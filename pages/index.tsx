import type { GetServerSideProps, NextPage } from 'next';
import {
  ChangeEventHandler,
  useEffect,
  useMemo,
  useState
} from 'react';

import { getPokemonsService } from '../service/pokemon';

import styles from '../styles/Home.module.css';
import { paginate } from '../utils/array';

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

  const pokemonsFiltered = useMemo(
    () =>
      pokemons.filter(({ modifyName }) =>
        modifyName.includes(searchName)
      ),
    [pokemons, searchName]
  );

  useEffect(() => {
    setPage(1);
    setPokemonSeeingList([]);
  }, [searchName]);

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

  const onChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchName(e.target.value);
  };

  return (
    <div className={styles.container}>
      <input
        placeholder="Digite um nome a pesquisar"
        onChange={onChange}
        value={searchName}
      />
      <ul>
        {pokemonSeeingList.map(
          ({ name, modifyName, id }) => (
            <li key={name}>
              {id} - {modifyName}
            </li>
          )
        )}
      </ul>
      {pokemonsFiltered.length >
        pokemonSeeingList.length && (
        <button onClick={onClickLoadMore}>
          Carregar mais
        </button>
      )}
    </div>
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
