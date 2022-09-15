import axios from 'axios';
const API_URL = '/api/users/';

// get all users
const getAllUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'getusers', config);

    return response.data;
}


const adminService = {
    getAllUsers,
}

export default adminService;
