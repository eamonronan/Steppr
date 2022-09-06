import axios from 'axios';

const API_URL = '/api/conversations/';


// create user conversation with Rosa
const createUserConversation = async (conversationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    console.log(API_URL);
    console.log(conversationData);
    console.log(config);
    const response = await axios.post(API_URL, conversationData, config);
    return response.data;
}

// get user conversations with Rosa
const getUserConversations = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config);

    return response.data;
}


const conversationService = {
    createUserConversation,
    getUserConversations
}

export default conversationService; 