import axios from 'axios';
const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://localhost:5067/api', // Replace with your .NET API URL
    headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${token}`,
    },
});

api.interceptors.response.use(
    response => response, // Pass successful responses
    error => {
        if (error.response?.status === 401) {
            console.error("Unauthorized: Redirecting to login...");
            // Redirect to login or perform logout
        } 
        else if (error.response?.status === 403) {
            console.error("Forbidden: Insufficient permissions.");
            // Show a "not allowed" message to the user
        }
        else if (error.response?.status === 401 && error.response?.data?.message === "Token expired") {
            console.error("Session expired. Redirecting to login...");
        }
        
        return Promise.reject(error); // Reject other errors
    }
);


export const login = (credentials) => api.post(`authenticate/login`, credentials);

export const register = (userDetails) => api.post(`authenticate/register`, userDetails);

export const registerAdmin = (adminDetails) => api.post(`authenticate/register-admin`, adminDetails);

export const logout = () => {
    const token = localStorage.getItem('token');
    return api.get('/authenticate/logout', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }); 
};

//create methods
export const createProperty = (property) => api.post(`/property`, property);
export const createMachine = (machine) => api.post(`/machine/`, machine);        

export const getProperties = () => api.get(`/property`);
export const getMachines = (id) => api.get(`/machine/property/${id}`)
