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
      <ImagesContainer>
        {frontImage && (
          <Image
            src={frontImage}
            alt={`Pokemon front ${
              isShiny ? 'shiny' : 'normal'
            }`}
            width={300}
            height={300}
          />
        )}
        {backImage && (
          <Image
            src={backImage}
            alt={`Pokemon back ${
              isShiny ? 'shiny' : 'normal'
            }`}
            width={300}
            height={300}
          />
        )}
      </ImagesContainer>
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
