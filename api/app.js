const express = require("express");

const app = express();

app.get('/')

app.listen(process.env.PORT || 4000, () => {
    console.log("Application started and Listening on port 4000");
  });
  
  