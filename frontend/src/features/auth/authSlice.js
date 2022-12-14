import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null, 
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
})

export const updateStepCount = createAsyncThunk('auth/update', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.updateStepCount(userData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateUserGoals = createAsyncThunk('auth/updategoals', async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.updateUserGoals(userData, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// get user info 
export const getMe = createAsyncThunk('auth/me',  async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.getMe(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// log in trainer
export const loginTrainer = createAsyncThunk('auth/logintrainer', async (user, thunkAPI) => {
    try {
        return await authService.loginTrainer(user);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


export const authSlice = createSlice({
    name: 'auth', 
    initialState, 
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(updateStepCount.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateStepCount.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateStepCount.rejected, (state, action) => {
                state.isLoading = false
                state.isError=true
                state.message = action.payload
            })
            .addCase(updateUserGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUserGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError=true
                state.message = action.payload
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false
                state.isError=true
                state.message = action.payload
            })
            .addCase(loginTrainer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginTrainer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(loginTrainer.rejected, (state, action) => {
                state.isLoading = false
                state.isError=true
                state.message = action.payload
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer