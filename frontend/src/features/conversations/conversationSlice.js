import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import conversationService from './conversationService';


const initialState = {
    conversations: [],
    lastFiveConversations: [],
    isError: false,
    isSuccess: false, 
    isLoading: false, 
    message: '',
}

export const createUserConversation = createAsyncThunk('conversations/create', async (conversationData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await conversationService.createUserConversation(conversationData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}) 

// fetch user conversations
export const getUserConversations= createAsyncThunk('conversations/getConversations', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await conversationService.getUserConversations(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// fetch last five user conversations
export const getLastFiveConversations = createAsyncThunk('conversations/getLastFive', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await conversationService.getLastFiveConversations(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },

    extraReducers: (builder) => {
        builder
            .addCase(createUserConversation.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUserConversation.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.conversations.push(action.payload);
            })
            .addCase(createUserConversation.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserConversations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserConversations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.conversations = action.payload;
            })
            .addCase(getUserConversations.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getLastFiveConversations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLastFiveConversations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.lastFiveConversations = action.payload;
            })
            .addCase(getLastFiveConversations.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = conversationSlice.actions;
export default conversationSlice.reducer; 