// Import Packages
const express = require('express');
const {v4:uuidv4} = require('uuid');

// Initialise Constants
const app = express();

// Configurations
app.set('view engine', 'ejs');
app.use(express.static('public'))

// Routes
app.get("/",(req, res) => {
  return res.redirect(`/${uuidv4()}`);
})

app.get("/:id",(req, res) => {
  return res.render("index", {uuid:req.params.id});
})

// Server Setup
app.listen(process.env.PORT || 3000, ()=>{
  console.log(`Server listening on port ${process.env.PORT||3000}`);
});