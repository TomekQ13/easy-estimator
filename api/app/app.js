const express = require("express");

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const voteRouter = require('./routes/vote')
app.use('/vote', voteRouter)
const sessionRouter = require('./routes/session')
app.use('/session', sessionRouter)

app.listen(process.env.PORT || 4000, () => {
    console.log("Application started and Listening on port 4000");
  });
  
module.exports = app