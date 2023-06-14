const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
const io = socketIO(server);

app.use(bodyParser.json());

// Serve the static files (HTML, CSS, JS)
app.use(express.static('public'));

// Handle incoming JSON data
app.post('/data', (req, res) => {
  const data = req.body;
  // Emit the received data to all connected clients
  io.emit('newData', data);
  res.sendStatus(200);
});
