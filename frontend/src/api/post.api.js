import { Axios } from "../utils/axiosInstance";

export const getRejectedResume = async () => {
  try {
    const response = await Axios.post('/post/getStatus', { 
        status:"REJECTED" 
    });
    return response.data;
  } catch (error) {
    console.error('Get rejected resume error:', error);
    throw error;
  }
};
export const getPendingResume = async () => {
  try {
    const response = await Axios.post('/post/getStatus', { 
        status:"PENDING" 
    });
    return response.data;
  } catch (error) {
    console.error('Get pending resume error:', error);
    throw error;
  }
};
export const getPortByTag = async (tags) => {
  try {
    const query = tags.map(tag => tag.toLowerCase()).join(',');
    const response = await Axios.get(`/post/${encodeURIComponent(query)}/getTag`, {
      withCredentials: true
    });
    return response;
  } catch (error) {
    console.error('Get portfolio by tags:', error);
    throw error;
  }
}


export const submitPortfolio = async (userId, title, url, jobPosition, 
    company, shortDesc, learning, tags) => {
    try {
        const payload = {
        userId, 
        title,
        url,
        jobPosition,
        company,
        shortDesc,
        tags
        };

        if (learning) payload.learning = learning;

        const response = await Axios.post('/post/CreatePost', payload);
        return response.data;

    } catch (error) {
        console.error('Submit portfolio error:', error);
        throw error;
    }
};

export const getPortNotification = async() => {
    try {
        const response = await Axios.get('/post/get',{withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('Fail to fetch portfolio from database:',error);
        throw error
    }
}


