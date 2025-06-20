# Environment Configuration Setup

This guide explains how to set up environment variables for the webhook server.

## Quick Setup

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file** with your specific values

3. **Start the server**:
   ```bash
   pnpm start
   # or
   npm start
   ```

## Environment Variables

### Required Variables

| Variable | Description | Default Value | Example |
|----------|-------------|---------------|---------|
| `SERVER_API` | Angular frontend URL for CORS | `http://localhost:4200` | `http://localhost:4200` |
| `PORT` | Server port number | `3000` | `3000` |
| `NODE_ENV` | Environment mode | `development` | `development` |

### .env File Format

Create a `.env` file in your project root with the following content:

```env
# Angular Frontend URL
SERVER_API=http://localhost:4200

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Different Environments

### Development Environment
```env
SERVER_API=http://localhost:4200
PORT=3000
NODE_ENV=development
```

### Production Environment
```env
SERVER_API=https://your-angular-app.com
PORT=8080
NODE_ENV=production
```

### Testing Environment
```env
SERVER_API=http://localhost:4201
PORT=3001
NODE_ENV=test
```

## Security Best Practices

### 1. Never Commit .env Files
Add to your `.gitignore`:
```gitignore
# Environment variables
.env
```

### 2. Use .env.example for Documentation
- Keep `.env.example` in version control
- Remove sensitive values from the example
- Document what each variable does

### 3. Validate Required Variables
Add validation to your server code:
```javascript
// At the top of server.js
const requiredEnvVars = ['SERVER_API', 'PORT'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});
```

## Troubleshooting

### Common Issues

**1. "Cannot find module 'dotenv'" Error**
```bash
# Install dotenv
pnpm install dotenv
# or
npm install dotenv
```

**2. Environment Variables Not Loading**
- Check if `.env` file exists in project root
- Verify `require('dotenv').config()` is at the top of server.js
- Ensure no spaces around the `=` in `.env` file

**3. CORS Issues**
- Verify `SERVER_API` matches your Angular dev server URL exactly
- Check if Angular is running on the specified port
- Ensure no trailing slash in the URL

### Debugging Environment Variables

Add this to your server.js to debug:
```javascript
console.log('Environment Variables:', {
  SERVER_API: process.env.SERVER_API,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});
```

## Advanced Configuration

### Using Different .env Files

```bash
# Development
cp .env.example .env.development

# Production  
cp .env.example .env.production

# Load specific environment
NODE_ENV=production node server.js
```

### Dynamic Port Configuration

Update your server.js to use the PORT environment variable:
```javascript
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor WebHook rodando em http://localhost:${PORT}`);
});
```

## File Structure

```
webhook-server/
├── server.js
├── .env                 # Your actual environment variables (not in git)
├── package.json
├── README.md
└── .gitignore
```

## Environment Variable Loading Order

1. **System Environment Variables** (highest priority)
2. **.env file** (loaded by dotenv)
3. **Default values in code** (fallback)

Example:
```javascript
const port = process.env.PORT || 3000; // System env > .env > default
```
