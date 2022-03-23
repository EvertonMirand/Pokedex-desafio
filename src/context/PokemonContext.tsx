import React, {
  useCallback,
  createContext,
  useState
} from 'react';

export interface PokemonContextType {
  isShiny: boolean;
  isFemale: boolean;
  changeToFemale: () => void;
  changeToMale: () => void;
  changeToShiny: () => void;
  changeToNormalColor: () => void;
}

const DEFAULT_VALUES: PokemonContextType = {
  isShiny: false,
  isFemale: false,
  changeToFemale: () => undefined,
  changeToMale: () => undefined,
  changeToShiny: () => undefined,
  changeToNormalColor: () => undefined
};

export const PokemonContext = createContext(DEFAULT_VALUES);

export const PokemonProvider: React.FC = ({ children }) => {
  const [isShiny, setIsShiny] = useState(
    DEFAULT_VALUES.isShiny
  );
  const [isFemale, setIsFemale] = useState(
    DEFAULT_VALUES.isFemale
  );

  const changeToFemale = useCallback(() => {
    setIsFemale(true);
  }, []);

  const changeToMale = useCallback(() => {
    setIsFemale(false);
  }, []);

  const changeToShiny = useCallback(() => {
    setIsShiny(true);
  }, []);

  const changeToNormalColor = useCallback(() => {
    setIsShiny(false);
  }, []);

  const values = {
    isShiny,
    isFemale,
    changeToFemale,
    changeToMale,
    changeToShiny,
    changeToNormalColor
  };

  return (
    <PokemonContext.Provider value={values}>
      {children}
    </PokemonContext.Provider>
  );
};
