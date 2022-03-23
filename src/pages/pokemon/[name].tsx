import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { Pokemon } from '../../models/Pokemon';
import { getPokemonService } from '../../service/pokemon';

interface Props {
  pokemon: Pokemon;
}

const Pokemon: NextPage<Props> = ({ pokemon }) => {
  const { sprites: { front_default, back_default } = {} } =
    pokemon;
  return (
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
  );
};

export const getServerSideProps: GetServerSideProps =
  async ({ query }) => {
    const name = query.name as string;

    const pokemon = await getPokemonService(name);

    return {
      props: { pokemon }
    };
  };

export default Pokemon;
