const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded( {limit: '30mb', extended: true} ));

app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/conversations', require('./routes/conversationRoutes'));

/* app.use('/admin', require())
 */
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));