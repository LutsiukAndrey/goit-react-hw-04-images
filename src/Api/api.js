import axios from 'axios';
const API = `https://pixabay.com/api/?key=`;
const KEY = '30404662-cb888472014add4e417cbeee2';

export const fetchPhotos = async (query, page) => {
  const url = `${API}${KEY}&q=${query}&image_type=photo&pretty=true&per_page=12&page=${page}&safesearch=true`;

  try {
    const { data } = await axios.get(url);

    return data;
  } catch (error) {}
};
