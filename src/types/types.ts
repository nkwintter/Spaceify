export type ImageData = {
  url: string;
  title: string;
  explanation: string;
};

export type FavoriteButtonProps = {
  image: ImageData;
  favorito: boolean;
  setFavorito: (valor: boolean) => void;
};