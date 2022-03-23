export interface PokemonListType {
  name: string;
  url: string;
}

interface Ability {
  ability: {
    name: string;
    url: String;
  };
  is_hidden: boolean;
  slot: number;
}

interface GameIndice {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetail[];
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Form {
  name: string;
  url: string;
}

interface Sprites {
  back_default: string;
  back_female?: string | null;
  back_shiny: string;
  back_shiny_female?: string | null;
  front_default: string;
  front_female?: string | null;
  front_shiny: string;
  front_shiny_female?: string | null;
  other: {
    [key: string]: { [key: string]: string | null };
  };
}

interface HeldItems {
  item: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: GameIndice[];
  height: number;
  held_items: HeldItems[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: any[];
  species: {
    name: string;
    url: string;
  };
  sprites?: Sprites;
  stats: Stats[];
  types: Types[];
  weight: number;
}
