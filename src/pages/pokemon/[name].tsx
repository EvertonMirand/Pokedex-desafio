import { GetServerSideProps, NextPage } from 'next';

import Head from 'next/head';
import Image from 'next/image';
import { Pokemon } from '../../models/Pokemon';
import { getPokemonService } from '../../service/pokemon';

interface Props {
  pokemon: Pokemon;
  error?: string;
}

const Pokemon: NextPage<Props> = ({ pokemon, error }) => {
  if (error) {
    return (
      <div>
        <span>{error}</span>
      </div>
    );
  }

  const {
    sprites: { front_default, back_default } = {},
    name,
    base_experience,
    height,
    weight,
    types,
    abilities,
    stats
  } = pokemon;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <h1>{name}</h1>
      <div>
        {front_default && (
          <Image
            src={front_default}
            alt="Pokemon front"
            width={300}
            height={300}
          />
        )}
        {back_default && (
          <Image
            src={back_default}
            alt="Pokemon back"
            width={300}
            height={300}
          />
        )}
      </div>
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
              ({ base_stat, effort, stat: { name } }) => (
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
    </div>
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
