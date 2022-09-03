import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import workoutReducer from '../features/workouts/workoutSlice';
import conversationReducer from '../features/conversations/conversationSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutReducer,
    conversations: conversationReducer, 
  },
});
