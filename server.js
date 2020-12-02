require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors')
const app = express();

const { router: getRouter } = require('./profiles/routes/get');
const { router: postRouter } = require('./profiles/routes/post');
const { router: putRouter } = require('./profiles/routes/put');
const { router: deleteRouter } = require('./profiles/routes/delete');
const fileRoutes = require('./profiles/routes/file-upload')
const { PORT, DATABASE_URL } = require('./config');
const { router: authRouter, localStrategy, jwtStrategy, jwtAuth } = require('./auth');
const { router: usersRouter } = require('./users');

// Middleware 
app.use(cors());
app.use(express.json());
app.use(express.static('/client/public')); // serves files from public folder

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/user', getRouter);
app.use('/api/user', jwtAuth, postRouter);
app.use('/api/user', jwtAuth, putRouter);
app.use('/api/user', jwtAuth, deleteRouter);
app.use('/api/user/image', jwtAuth, fileRoutes);

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});


// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,multipart/form-data,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});


// Connect to DB 
mongoose.connect(
  DATABASE_URL, 
  { useUnifiedTopology: true },
  () => {
  console.log('connected to DB!')
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
