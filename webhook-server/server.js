/** Load environment variables from a .env file into process.env */
require('dotenv').config();

/** Import the Express framework for building the web server */
const express = require('express');

/** Import CORS middleware to allow cross-origin requests */
const cors = require('cors');

/** Create an instance of an Express application */
const app = express();

/**
 * ANSI escape codes for terminal text coloring
 * BLUE - for titles and key info
 * GRAY - for author note
 * RESET - resets to default console color
 */
const BLUE = '\u001b[34m';
const GRAY = '\u001b[90m';
const RESET = '\u001b[0m';

/**
 * Enable CORS (Cross-Origin Resource Sharing)
 * Allows requests from the Angular frontend (default: http://localhost:4200)
 */
app.use(cors({
  origin: process.env.SERVER_API || 'http://localhost:4200'
}));

/**
 * Middleware to automatically parse JSON request bodies
 */
app.use(express.json());

/**
 * POST /webhook endpoint
 * Logs the incoming request body and responds with a success message
 * @param {Object} req - Express Request object containing the webhook data
 * @param {Object} res - Express Response object to send a JSON response
 */
app.post('/webhook', (req, res) => {
  console.log(`${BLUE}\n\nWebhook received:${RESET}`, req.body);
  res.status(200).json({ message: 'Webhook processed successfully' });
});

/**
 * Starts the Express server
 * Server listens on port and logs startup messages
 */
app.listen(process.env.PORT, () => {
  console.log(`${BLUE}\n\n🚀 WebHook Server running at http://localhost:${process.env.PORT}${RESET}`);
  console.log(`\n${GRAY}Created by: https://github.com/Vidigal-code${RESET}`);
});
