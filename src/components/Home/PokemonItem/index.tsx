import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, PokemonNameText } from './styles';

interface Props {
  name: string;
  id: number;
  modifyName?: string;
  image?: string;
}

const imageSize = 100;

const PokemonItem: React.FC<Props> = ({
  name,

  modifyName,
  image = ''
}) => {
  const { push } = useRouter();

  const onClick = () => {
    push(`/pokemon/${name}`);
  };

  return (
    <Container
      key={name}
      onClick={onClick}
      data-testid={`PokemonCardItem${name}`}
    >
      <PokemonNameText>{`${
        modifyName ?? name
      }`}</PokemonNameText>
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
