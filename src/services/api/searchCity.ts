import axios from 'axios';
import { ErrorRequest } from '@/types/errorRequest';

const mapboxApiKey = import.meta.env.VITE_APP_MAPBOX_API_KEY;

export async function getLocations(query: string): Promise<string[] | ErrorRequest | null> {
  return await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxApiKey}&types=place`
  )
  .then((data) => data.data.features)
  .catch(error => {
    return { 'message': error.message };
  });
}
