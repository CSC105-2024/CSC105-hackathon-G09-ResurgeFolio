import { Axios } from "../utils/axiosInstance"
export const getAllTag = async () => {
  try {
    const response = await Axios.get('/tags', { withCredentials: true });
    return response.data.data; 
  } catch (error) {
    throw error;
  }
};

