export interface Artwork {
  id: number;
  title: string;
  artist_display: string | null;
  place_of_origin: string | null;
  date_start: number | null;
  date_end: number | null;
}