import axios from "axios";
import { Image } from "../types";

const API_KEY = "nPAnBXgXRH3Bgwadcppr5AsKtjRk6FsV8RegisSFaFg";
const BASE_URL = "https://api.unsplash.com/search/photos";

interface FetchImagesResponse {
  hits: Image[];
}

// export const fetchImages = async (query, page = 1, perPage = 12) => {
//   if (!query.trim()) {
//     throw new Error("Запит не може бути порожнім!");
//   }
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         query,
//         page: Math.max(1, Math.floor(page)),
//         per_page: perPage,
//         client_id: API_KEY,
//       },
//     });
//     return response.data.results;
//   } catch (error) {
//     console.error("Error fetching images", error);
//     throw error;
//   }
// };

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

  return data.hits;
};
