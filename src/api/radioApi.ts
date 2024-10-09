import axios from 'axios';

const API_BASE_URL = 'https://de1.api.radio-browser.info/json';

export const fetchStations = async (limit: number = 10, offset: number = 0) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stations`, {
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
