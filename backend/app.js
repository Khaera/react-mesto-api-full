const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorRouter = require('./routes/error');

const auth = require('./middlewares/auth');

const { createUser, login } = require('./controllers/users');

const { PORT = 3000, MONGO_LINK } = process.env;

const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const registerValidation = require('./utils/validation/registerValidation');
const loginValidation = require('./utils/validation/loginValidation');
const limiter = require('./utils/rateLimiter');
const cors = require('./middlewares/cors');

const app = express();

app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());

app.use(cors);

mongoose.connect(MONGO_LINK, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signup', registerValidation, createUser);
app.post('/signin', loginValidation, login);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', errorRouter);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт: ${PORT}`);
});
