const express = require("express");

const app = express();

const voteRouter = require('./routes/vote')
app.use('/', voteRouter)
const sessionRouter = require('./routes/session')
app.use('/', sessionRouter)

app.listen(process.env.PORT || 4000, () => {
    console.log("Application started and Listening on port 4000");
  });
  
  