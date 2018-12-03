import axios from 'axios';
import colorCodeMap from './colorCodeMap';

// Doesn't need to be hidden so np
const APIKey = '1f0b0f4bfe60677eb3432fe814649210';

const status = (response) => {
  if (response.data.stat !== 'ok') {
    throw Error(`${response.data.code}: ${response.data.message}`);
  }

  return response.data;
};

const catchError = (error) => { throw Error(error); };

export const searchPhotos = ({
  text = 'dogs',
  page = 1,
  userId,
  colorCodes = [],
  date = 1541026800,
  license = [],
  tags = [],
}) => (
  axios.get('https://api.flickr.com/services/rest', {
    params: {
      page,
      text, // String to search on
      color_codes: colorCodeMap(colorCodes), // Example input ['Red'],
      min_taken_date: date, // Mysql datetime or unix timestamp
      license: license.join(',') || null, // License ids
      tags: tags.join(',') || null, // Text tags, max 20
      sort: 'relevance',
      content_type: 1, // Send photos
      per_page: 25,
      tag_mode: 'all',
      user_id: userId,
      method: 'flickr.photos.search',
      api_key: APIKey,
      format: 'json', // They mean JSONP :|
      nojsoncallback: 1, // Disable JSONP (send raw JSON) :D
      extras: 'owner_name,realname,description,date_upload,url_t,url_n,url_o',
    },
  })
    .then(status)
    .then(data => data.photos)
    .catch(catchError)
);

export const getInfo = photoId => (
  axios.get('https://api.flickr.com/services/rest', {
    params: {
      photo_id: photoId,
      method: 'flickr.photos.getInfo',
      api_key: APIKey,
      format: 'json', // They mean JSONP :|
      nojsoncallback: 1, // Disable JSONP (send raw JSON) :D
      extras: 'contact,date_upload,description,owner_name,realname,autotags,url_t,url_n,url_o',
    },
  })
    .then(status)
    .then(data => data.photo)
    .catch(catchError)
);

export const getSizes = photoId => (
  axios.get('https://api.flickr.com/services/rest', {
    params: {
      photo_id: photoId,
      method: 'flickr.photos.getSizes',
      api_key: APIKey,
      format: 'json', // They mean JSONP :|
      nojsoncallback: 1, // Disable JSONP (send raw JSON) :D
    },
  })
    .then(status)
    .then(data => data.sizes.size)
    .catch(catchError)
);

export const getDetail = photoId => (
  Promise.all([
    getInfo(photoId),
    getSizes(photoId),
  ])
    .then(response => response)
    .catch(catchError)
);

export const getLicenses = () => (
  axios.get('https://api.flickr.com/services/rest', {
    params: {
      method: 'flickr.photos.licenses.getInfo',
      api_key: APIKey,
      format: 'json', // They mean JSONP :|
      nojsoncallback: 1, // Disable JSONP (send raw JSON) :D
    },
  })
    .then(status)
    .then(data => data.licenses.license)
    .catch(catchError)
);
