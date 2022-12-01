import axios from 'axios';

const mapboxApiKey = import.meta.env.VITE_APP_MAPBOX_API_KEY;

export async function getLocations(query: string): Promise<string[] | null> {
  let result = null;
  
  if (query) {
    result = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxApiKey}&types=place`
    )
    .catch(error => console.log(error));
  }
  
  return result?.data.features;
}
