import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5067/api', // Replace with your .NET API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

//create methods
export const createProperty = () => api.post(`/property`);
export const createMachine = () => api.post(`/machine`);

