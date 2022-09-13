import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messageService from './messageService';


const initialState = {
    messages: [],
    isError: false,
    isSuccess: false, 
    isLoading: false, 
    message: '',
}

export const createMessage = createAsyncThunk('messages/create', async (messageData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await messageService.createMessage(messageData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}) 

export const getUserMessages = createAsyncThunk('messages/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await messageService.getUserMessages(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
}) 

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },

    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.messages.push(action.payload);
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.messages = action.payload;
            })
            .addCase(getUserMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        }
})
export const { reset } = messageSlice.actions;
export default messageSlice.reducer; 