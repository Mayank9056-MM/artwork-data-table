import type { Artwork } from "../App";

interface ArtworksApiResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string | null;
  };
}

const fetchArtworks = async (pageIdx: number): Promise<ArtworksApiResponse> => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${pageIdx}`
    );

    if (!response.ok) {
      throw new Error(`error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error;
  }
};

export { fetchArtworks };
