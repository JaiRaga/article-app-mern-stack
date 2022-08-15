require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/article', articlesRouter);

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server is up on port ${port}`));
