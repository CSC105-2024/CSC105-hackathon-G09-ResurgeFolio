import axios from 'axios';

const Axios = axios.create({
	baseURL: 'http://localhost:8000', // Your backend url
    withCredentials: true
});

export { Axios };