const express = require('express');
const app = express();

app.get("/",(req, res) => {
  return res.send("Welcome to Web Converse");
})

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`Server listening on port ${process.env.PORT||3000}`);
});