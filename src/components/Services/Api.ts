import axios from "axios";
import { Image } from "../types";

const API_KEY = "5w8x9F5ZnQmYKjkfT62K9MVK6ScJPmEO7aeoYH4f5UQ";
const BASE_URL = "https://api.unsplash.com/search/photos";

// interface FetchImagesResponse {
//   hits: Image[];
// }

interface UnsplashImage {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface FetchImagesResponse {
  results: UnsplashImage[];
}

export const fetchImages = async (
  query: string,
  page: number
): Promise<Image[]> => {
  const { data } = await axios.get<FetchImagesResponse>(BASE_URL, {
    params: {
      client_id: API_KEY,
      query,
      page,
      per_page: 12,
    },
  });

  console.log("Результат з API:", data);

  return data.results.map((img) => ({
    id: img.id,
    description: img.alt_description,
    smallImageURL: img.urls.small,
    largeImageURL: img.urls.regular,
  }));
};

// return data.hits ?? [];
