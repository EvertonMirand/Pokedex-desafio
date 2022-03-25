import React from 'react';

import { mocked } from 'jest-mock';
import { charizard } from '../../__mocks__/getReturns';
import api from '../../service/api';

import { PokemonProvider } from '../../context/PokemonContext';
import PokemonDetail, {
  getServerSideProps
} from '../../pages/pokemon/[name]';
import { Pokemon } from '../../models/Pokemon';
import {
  render,
  screen,
  fireEvent
} from '@testing-library/react';

jest.mock('../../service/api');

describe('Create Pokemon info page', () => {
  const getInitialData = async () => {
    const getValueMocked = mocked(api.get);
    getValueMocked.mockResolvedValue({
      data: charizard
    });
    const response = (await getServerSideProps({
      query: { name: 'charizard' }
    } as any)) as any;

    return response;
  };
  it('should change images', async () => {
    const response = await getInitialData();

    const pokemon = (response?.props?.pokemon ||
      {}) as Pokemon;
    const Component = () => (
      <PokemonProvider>
        <PokemonDetail pokemon={pokemon} />
      </PokemonProvider>
    );
    render(<Component />);
    const shinyBtn = screen.getByTestId('shiny-btn');
    fireEvent.click(shinyBtn);
    const shinyImg = screen.queryByAltText(
      'Pokemon back shiny'
    );
    const normalImage = screen.queryByAltText(
      'Pokemon back normal'
    );
    expect(shinyImg).toBeInTheDocument();
    expect(normalImage).not.toBeInTheDocument();
  });
});
