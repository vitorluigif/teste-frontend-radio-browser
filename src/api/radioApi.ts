import axios from 'axios';
import config from '../config/config';

export const fetchStations = async (limit: number = 10, offset: number = 0) => {
  try {
    const response = await axios.get(`${config.API_URL_STATIONS}/stations`, {
      params: {
        limit,
        offset
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw error;
  }
};
