import type { GetServerSideProps, NextPage } from 'next';

import { getPokemonsService } from '../service/pokemon';

import styles from '../styles/Home.module.css';

interface ModifyPokemonType {
  name: string;
  modifyName: string;
  id: number;
  url: string;
}

interface Props {
  pokemons: ModifyPokemonType[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <div className={styles.container}>
      <ul>
        {pokemons.map(({ name, modifyName, id }) => (
          <li key={name}>
            {id} - {modifyName}
          </li>
        ))}
      </ul>
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
