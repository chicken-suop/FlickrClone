import axios from 'axios';
import { APIKey } from '../../../config'; // Create this if it doesn't exist

export const searchPhotos = () => (
  axios.get('https://api.flickr.com/services/rest', {
    params: {
      sort: 'relevance',
      content_type: 7, // Send photos, screenshots, and 'other'
      per_page: 25,
      text: 'cat',
      color_codes: [0, 6],
      min_taken_date: 1541026800, // Mysql datetime or unix timestamp
      method: 'flickr.photos.search',
      api_key: APIKey,
      format: 'json', // They mean JSONP :|
      nojsoncallback: 1, // Disable JSONP (send raw JSON) :D
      extras: 'owner_name,realname,description,date_upload,url_t,url_n,url_z',
    },
  }).then((response) => {
    if (response.data.stat !== 'ok') {
      // Something broke
      console.log(response.data.stat, response.data.code, response.data.message);
    }
    return response.data;
  }).catch((error) => {
    // Something broke
    console.log(error.statusCode, error.statusMessage);
    return error;
  })
);

export const getContext = () => ({});
