import { debounce } from 'lodash';
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import { paginate } from '../../utils/array';

export interface ModifyPokemonType {
  name: string;
  modifyName: string;
  id: number;
  url: string;
  image: string;
}

const pageSize = 10;

export const useHome = (pokemons: ModifyPokemonType[]) => {
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

  return {
    onChangeDebounce,
    onClickLoadMore,
    pokemonSeeingList,
    searchName,
    currentPage,
    pokemonsFiltered
  };
};
