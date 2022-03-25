import { GetServerSideProps, NextPage } from 'next';

import Head from 'next/head';
import PokemonAbilities from '../../components/PokemonDetails/PokemonAbilities';

import PokemonSprites from '../../components/PokemonDetails/PokemonSprites';
import { Container } from '../../components/PokemonDetails/PokemonSprites/styles';
import PokemonStats from '../../components/PokemonDetails/PokemonStats';
import PokemonTypes from '../../components/PokemonDetails/PokemonTypes';

import HasErroContainer from '../../components/shared/HasErroContainer';

import { Pokemon } from '../../models/Pokemon';
import { getPokemonService } from '../../service/pokemon';
import {
  PokemonDetailContent,
  PokemonInfoContainer
} from '../../styles/PokemonDetailStyles';

interface Props {
  pokemon: Pokemon;
  error?: string;
}

const PokemonDetail: NextPage<Props> = ({
  pokemon,
  error
}) => {
  const {
    name,
    base_experience,
    height,
    weight,
    types,
    abilities,
    stats
  } = pokemon || {};

  return (
    <HasErroContainer error={error}>
      <Head>
        <title>{name}</title>
      </Head>

      <Container>
        <PokemonDetailContent>
          <h1>{name}</h1>
          <PokemonSprites pokemon={pokemon} />
          <div>
            <PokemonTypes types={types} />
            <div>
              <PokemonAbilities abilities={abilities} />
              <PokemonStats stats={stats} />
              <PokemonInfoContainer>
                <p>
                  <strong>Base experience</strong>:{' '}
                  {base_experience}
                </p>
                <p>
                  <strong>Height:</strong> {height}
                </p>
                <p>
                  <strong>Weight:</strong> {weight}
                </p>
              </PokemonInfoContainer>
            </div>
          </div>
        </PokemonDetailContent>
      </Container>
    </HasErroContainer>
  );
};

export const getServerSideProps: GetServerSideProps =
  async ({ query }) => {
    try {
      const name = query.name as string;

      const pokemon = await getPokemonService(name);

      return {
        props: { pokemon }
      };
    } catch ({ message }) {
      return {
        props: {
          error: message || 'An unexpected error ocurred'
        }
      };
    }
  };

export default PokemonDetail;
