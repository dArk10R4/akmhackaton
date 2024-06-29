const express = require('express');
const UserRoute = require('./Routes/UserRoute');
const ReportRoute = require('./Routes/ReportRoute');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.use('/user', UserRoute);
app.use('/report', ReportRoute);

module.exports = app;
