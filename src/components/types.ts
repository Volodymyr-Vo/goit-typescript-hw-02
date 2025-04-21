export interface Image {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
}
