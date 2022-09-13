import axios from 'axios';
const API_URL = '/api/messages/';

// create message
const createMessage= async (messageData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, messageData, config);
    return response.data;
}

// get user messages
const getUserMessages = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config);

    return response.data;
}


const messageService = {
    createMessage,
    getUserMessages
}

export default messageService;