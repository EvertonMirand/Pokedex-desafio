import { GetServerSideProps, NextPage } from 'next';

import Head from 'next/head';

import PokemonSprites from '../../components/PokemonDetails/PokemonSprites';
import { Container } from '../../components/PokemonDetails/PokemonSprites/styles';

import HasErroContainer from '../../components/shared/HasErroContainer';

import { Pokemon } from '../../models/Pokemon';
import { getPokemonService } from '../../service/pokemon';
import { PokemonDetailContent } from '../../styles/PokemonDetailStyles';

interface Props {
  pokemon: Pokemon;
  error?: string;
}

const Pokemon: NextPage<Props> = ({ pokemon, error }) => {
  const {
    name,
    base_experience,
    height,
    weight,
    types,
    abilities,
    stats
  } = pokemon;

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
            <div>
              <p>Base experience: {base_experience}</p>
              <p>Height: {height}</p>
              <p>Weight: {weight}</p>
              <p>Types: </p>
              <div>
                {types.map(({ type: { name } }) => (
                  <div key={name}>
                    <p>{name}</p>
                  </div>
                ))}
              </div>
              <p>Abilities:</p>
              <div>
                {abilities.map(
                  ({ ability: { name }, is_hidden }) => (
                    <p key={name}>
                      {name}
                      {is_hidden ? ' hidden ability' : ''}
                    </p>
                  )
                )}
              </div>
              <div>
                <p>Stats:</p>
                {stats.map(
                  ({
                    base_stat,
                    effort,
                    stat: { name }
                  }) => (
                    <div key={name}>
                      <p>{name}</p>
                      <p>{base_stat}</p>
                      <p>{effort}</p>
                    </div>
                  )
                )}
              </div>
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

export default Pokemon;
