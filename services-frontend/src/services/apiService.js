import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your .NET API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;