import { fetchArtworks } from "../api/artworksApi";

const useArtworks = (pageIdx: number) => {
  const getArtworks = async () => {
    try {        
      const data = await fetchArtworks(pageIdx);
      return data;
    } catch (error) {
      console.error('Error fetching artworks:', error);
      throw error;
    }
  };                  
  return getArtworks;
}        

export default useArtworks; 