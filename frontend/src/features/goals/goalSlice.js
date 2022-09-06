import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
    userPrimaryGoal: '',
    userSecondaryGoal: '',
    stepGoal: '',
    isError: false,
    isSuccess: false, 
    isLoading: false, 
    message: '',
}

// fetch user primary goal
export const getUserPrimaryGoal = createAsyncThunk('goals/getPrimaryGoal', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getUserPrimaryGoal(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// fetch user secondary goal
export const getUserSecondaryGoal = createAsyncThunk('goals/getSecondaryGoal', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getUserSecondaryGoal(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// fetch user step goal
export const getUserStepGoal = createAsyncThunk('goals/getStepGoal', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getUserStepGoal(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },

    extraReducers: (builder) => {
        builder
            .addCase(getUserPrimaryGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserPrimaryGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.userPrimaryGoal = action.payload;
            })
            .addCase(getUserPrimaryGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserSecondaryGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserSecondaryGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.userSecondaryGoal = action.payload;
            })
            .addCase(getUserSecondaryGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserStepGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserStepGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.stepGoal = action.payload;
            })
            .addCase(getUserStepGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})


export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
