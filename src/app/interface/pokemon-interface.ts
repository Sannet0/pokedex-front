export interface IPokemon {
  name: string;
  img: string;
  stats: { name: string; point: number }[];
  types: string[];
  isFavorite: boolean;
}
