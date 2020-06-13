import axios from 'axios';
import origin from '../config';

const getDeck = async () => {
  const response = await axios.get(`${origin}/api/v1/deck/`);
  return response.data;
};

export default getDeck;
