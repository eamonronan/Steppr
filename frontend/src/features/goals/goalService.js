import axios from 'axios';
import { useSelector } from 'react-redux';


const API_URL = '/api/users/';




// get userPrimaryGoal
const getUserPrimaryGoal = async (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'primarygoal/' + userId, config);

    return response.data;
}

// get userSecondaryGoal
const getUserSecondaryGoal = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'secondarygoal/', config);

    return response.data;
}

// get userStepGoal
const getUserStepGoal = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'stepcount/', config);

    return response.data;
}

const goalService = {
    getUserPrimaryGoal,
    getUserSecondaryGoal,
    getUserStepGoal
}

export default goalService