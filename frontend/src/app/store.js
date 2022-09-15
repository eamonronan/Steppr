import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import workoutReducer from '../features/workouts/workoutSlice';
import conversationReducer from '../features/conversations/conversationSlice';
import goalReducer from '../features/goals/goalSlice';
import messageReducer from '../features/messages/messageSlice';
import adminReducer from '../features/admin/adminSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer,
    workouts: workoutReducer,
    conversations: conversationReducer, 
    messages: messageReducer,
    admin: adminReducer,
  },
});
