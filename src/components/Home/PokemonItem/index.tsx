import Image from 'next/image';
import Link from 'next/link';
import { Container } from './styles';

interface Props {
  name: string;
  id: number;
  modifyName?: string;
  image?: string;
}

const imageSize = 60;

const PokemonItem: React.FC<Props> = ({
  name,
  id,
  modifyName,
  image = ''
}) => {
  return (
    <Container key={name}>
      <Link href={`/pokemon/${name}`} passHref>
        {`${id} - ${modifyName ?? name}`}
      </Link>
      <Image
        src={image}
        alt={modifyName}
        width={imageSize}
        height={imageSize}
      />
    </Container>
  );
};

export default PokemonItem;
