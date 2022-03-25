import React from 'react';

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { fireEvent, waitFor } from '@testing-library/dom';
import Home, {
  getServerSideProps,
  ModifyPokemonType
} from '../../pages';

import { mocked } from 'jest-mock';
import { pokemonList } from '../../__mocks__/getReturns';
import api from '../../service/api';
import { useRouter } from 'next/router';

jest.mock('../../service/api');
jest.mock('next/router');
jest.mock('lodash/debounce', () =>
  jest.fn((fn) => {
    fn.cancel = jest.fn();
    return fn;
  })
);

jest.useFakeTimers();

describe('Create home page', () => {
  const getInitialData = async () => {
    const getValueMocked = mocked(api.get);
    getValueMocked.mockResolvedValue({
      data: { results: pokemonList }
    });
    const response = (await getServerSideProps(
      {} as any
    )) as any;
    return response;
  };
  it('Should have clear button', async () => {
    const Component = () => <Home pokemons={[]} />;

    await act(async () => {
      render(<Component />);
    });
    const component = screen.getByTestId(
      'search-name-input'
    );

    expect(component).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const response = await getInitialData();
    expect(response.props.pokemons.length).toBe(20);
  });

  it('show 10 pokemons', async () => {
    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValue({
      push: () => undefined
    } as any);

    const response = await getInitialData();
    const pokemons = response.props
      .pokemons as ModifyPokemonType[];
    const Component = () => <Home pokemons={pokemons} />;
    await act(async () => {
      render(<Component />);
    });
    const pokemonsCards = screen.getAllByTestId(
      'PokemonCardItem',
      {
        exact: false
      }
    );

    expect(pokemonsCards.length).toBe(10);
  });

  it('show 20 pokemons', async () => {
    const useRouterMocked = mocked(useRouter);
    useRouterMocked.mockReturnValue({
      push: () => undefined
    } as any);

    const response = await getInitialData();
    const pokemons = response.props
      .pokemons as ModifyPokemonType[];
    const Component = () => <Home pokemons={pokemons} />;
    await act(async () => {
      render(<Component />);
    });

    const loadMoreBtn = screen.getByTestId('load-more-btn');
    fireEvent.click(loadMoreBtn);
    const pokemonsCards = screen.getAllByTestId(
      'PokemonCardItem',
      {
        exact: false
      }
    );

    expect(pokemonsCards.length).toBe(20);
  });

  it('filter pokemons', async () => {
    const useRouterMocked = mocked(useRouter);

    useRouterMocked.mockReturnValue({
      push: () => undefined
    } as any);

    const response = await getInitialData();
    const pokemons =
      response?.props?.pokemons ||
      ([] as ModifyPokemonType[]);
    const Component = () => <Home pokemons={pokemons} />;

    const { rerender } = render(<Component />);

    await act(async () => {
      rerender(<Component />);
    });

    const input = screen.getByTestId('search-name-input');
    await act(async () => {
      fireEvent.input(input, {
        target: { value: 'char' }
      });
      jest.runAllTimers();
    });

    await act(async () => {
      await rerender(<Component />);
    });

    const pokemonsCards = screen.getAllByTestId(
      'PokemonCardItem',
      {
        exact: false
      }
    );

    expect(pokemonsCards.length).toBe(3);
  });
});
