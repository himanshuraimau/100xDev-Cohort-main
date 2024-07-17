// Importing WebSocket and WebSocketServer from the 'ws' library
import WebSocket, { WebSocketServer } from 'ws';
// Importing the 'http' module from Node.js
import http from 'http';

// Creating an HTTP server
const server = http.createServer(function(request: any, response: any) {
    // Logging the received request URL to the console
    console.log((new Date()) + ' Received request for ' + request.url);
    // Sending a response back to the client
    response.end("hi there");
});

// Creating a WebSocket server instance, attached to the HTTP server
const wss = new WebSocketServer({ server });

// Handling WebSocket connections
wss.on('connection', function connection(ws) {
  // Handling WebSocket errors
  ws.on('error', console.error);

  // Handling incoming WebSocket messages
  ws.on('message', function message(data, isBinary) {
    // Sending received message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  // Sending a welcome message to the newly connected client
  ws.send('Hello! Message From Server!!');
});
// Listening on port 8080 for incoming HTTP and WebSocket connections
server.listen(8080, function() {
    // Logging that the server is now listening on port 8080
    console.log((new Date()) + ' Server is listening on port 8080');
});
