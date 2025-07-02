export interface ImageData {
  url: string;
  hdurl?: string;
  thumbnail_url?: string;
  title: string;
  explanation: string;
  date?: string;
  media_type?: string;
}

export type FavoriteButtonProps = {
  image: ImageData;
  favorito: boolean;
  setFavorito: (valor: boolean) => void;
};