const express = require('express');
const server = express();

module.exports = () => {
  server.listen(3000, ()=>{console.log("Server is Ready!")});
}

server.all('/', (req, res)=>{
  res.send('Hello Dave, I\'m still alive!')
})
