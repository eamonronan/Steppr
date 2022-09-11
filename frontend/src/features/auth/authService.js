import axios from 'axios'

const API_URL = '/api/users/';

const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const updateStepCount = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + userData._id, userData, config);

    return response.data;
} 

const updateUserGoals = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + userData._id, userData, config);

    return response.data;
} 


const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const loginTrainer = async (userData) => {
    const response = await axios.post(API_URL + 'trainerlogin', userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const logout = () => {
    localStorage.removeItem('user');
}

const getMe = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'me', config);
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const authService = {
    register, 
    logout, 
    login,
    updateStepCount,
    updateUserGoals,
    getMe, 
    loginTrainer
}

export default authService