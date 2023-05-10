const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
	console.log("MongoDB database connection established successfully.");
});


const ticketsRouter = require('./routes/tickets');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');

app.use('/tickets', ticketsRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
