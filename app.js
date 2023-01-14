// Import Packages
const express = require('express');

// Initialise Constants
const app = express();

// Configurations
app.set('view engine', 'ejs');
app.use(express.static('public'))

// Routes
app.get("/",(req, res) => {
  return res.render("index");
})

// Server Setup
app.listen(process.env.PORT || 3000, ()=>{
  console.log(`Server listening on port ${process.env.PORT||3000}`);
});