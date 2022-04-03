const express = require("express");

const app = express();
const cors = require('cors')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors())

const voteRouter = require('./routes/vote')
app.use('/vote', voteRouter)
const sessionRouter = require('./routes/session')
app.use('/session', sessionRouter)

app.listen(process.env.PORT || 4000, () => {
    console.log("Application started and Listening on port 4000");
  });
  
module.exports = app