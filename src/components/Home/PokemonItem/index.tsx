import Link from 'next/link';
import { Container } from './styles';

interface Props {
  name: string;
  id: number;
  modifyName?: string;
}

const PokemonItem: React.FC<Props> = ({
  name,
  id,
  modifyName
}) => {
  return (
    <Container key={name}>
      <Link href={`/pokemon/${name}`} passHref>
        {`${id} - ${modifyName ?? name}`}
      </Link>
    </Container>
  );
};

export default PokemonItem;
