import Image from 'next/image';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { notFoundPokemonImage } from '../../../utils/image.utils';

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
  const [errorImage, setErrorImage] = useState(false);
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
        src={errorImage ? notFoundPokemonImage : image}
        alt={modifyName}
        width={imageSize}
        height={imageSize}
        onError={() => {
          setErrorImage(true);
        }}
      />
    </Container>
  );
};

export default PokemonItem;
