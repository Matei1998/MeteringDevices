import axios from 'axios'


const API_URL = "http://localhost:8081/Device"

const DeviceService = {

        add: async(device) => {
                const response = await axios.post(`${API_URL}/addDevice`,device);
                return response.data;
        },

        delete: async(deviceId)=>{
            const response = await axios.delete(`${API_URL}/Delete/${deviceId}`)
            return response.data;
        },

        getAllDevices : async()=>{
            const response = await axios.get(`${API_URL}/GetAllDevices`)
            return response.data;
        },
        update: async(device) =>{
            const response = await axios.put(`${API_URL}/Update`,device)
            return response.data;
        },

        getDevicesByUserId: async (userId) => {
            try {
                const response = await axios.get(`${API_URL}/user/${userId}`);
                console.log("Response from API:", response.data); // Loghează răspunsul API
                return response.data;
            } catch (error) {
                console.error("Eroare la obținerea dispozitivelor pentru user ID:", userId, error);
                throw error;
            }
        }
        





}
export default DeviceService;