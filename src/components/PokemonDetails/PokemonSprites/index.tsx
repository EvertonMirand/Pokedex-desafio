import Image from 'next/image';
import React, { useContext } from 'react';
import { PokemonContext } from '../../../context/PokemonContext';
import { usePokemon } from '../../../hooks/Pokemon/usePokemon';
import { Pokemon } from '../../../models/Pokemon';

import {
  ButtonSpriteContainer,
  ChoseSpriteButton,
  Container,
  ImagesContainer,
  OptionSpriteContainer
} from './styles';

interface Props {
  pokemon: Pokemon;
}

interface PokemonImageProps {
  frontImage: string;
  backImage: string;
  isShiny: boolean;
}

const getPokemonColorTypeName = (
  isShiny: boolean = false
): 'shiny' | 'normal' => {
  return isShiny ? 'shiny' : 'normal';
};

const PokemonImage: React.FC<PokemonImageProps> = ({
  backImage,
  frontImage,
  isShiny
}) => {
  const pokemonColorTypeName =
    getPokemonColorTypeName(isShiny);

  return (
    <ImagesContainer>
      {frontImage && (
        <Image
          src={frontImage}
          alt={`Pokemon front ${pokemonColorTypeName}`}
          width={300}
          height={300}
        />
      )}
      {backImage && (
        <Image
          src={backImage}
          alt={`Pokemon back ${pokemonColorTypeName}`}
          width={300}
          height={300}
        />
      )}
    </ImagesContainer>
  );
};

const PokemonSprites: React.FC<Props> = ({ pokemon }) => {
  const {
    changeToFemale,
    changeToMale,
    changeToShiny,
    changeToNormalColor,
    isFemale,
    isShiny
  } = useContext(PokemonContext);

  const { backImage, frontImage } = usePokemon(pokemon);
  return (
    <Container>
      <PokemonImage
        backImage={backImage}
        frontImage={frontImage}
        isShiny={isShiny}
      />
      <ButtonSpriteContainer>
        <OptionSpriteContainer>
          <ChoseSpriteButton
            onClick={changeToMale}
            disabled={!isFemale}
            data-testid="male-btn"
          >
            Male
          </ChoseSpriteButton>
          <ChoseSpriteButton
            onClick={changeToFemale}
            disabled={isFemale}
            data-testid="female-btn"
          >
            Female
          </ChoseSpriteButton>
        </OptionSpriteContainer>
        <OptionSpriteContainer>
          <ChoseSpriteButton
            onClick={changeToNormalColor}
            disabled={!isShiny}
            data-testid="normal-btn"
          >
            Normal
          </ChoseSpriteButton>
          <ChoseSpriteButton
            onClick={changeToShiny}
            disabled={isShiny}
            data-testid="shiny-btn"
          >
            Shiny
          </ChoseSpriteButton>
        </OptionSpriteContainer>
      </ButtonSpriteContainer>
    </Container>
  );
};

export default PokemonSprites;
