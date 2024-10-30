import axios from 'axios';

const API_URL = 'http://localhost:8080/User'; 

const UserService = {
    register: async (user) => {
        const response = await axios.post(`${API_URL}/Register`, user);
        return response.data;
    },


    delete: async (userId) => {
        const response = await axios.delete(`${API_URL}/Delete/${userId}`);
        return response.data;
    },

    getAllUsers: async () => {
        const response = await axios.get(`${API_URL}/GetAll`); 
        return response.data;
    },
    
    update: async (user) => {
        const response = await axios.put(`${API_URL}/Update`, user);
        return response.data;
    }
    
};

export default UserService;
