const path = require('path');
const express = require('express');

const app = express();
const publicDir = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

function validateRequiredFields(payload, fields) {
  return fields.filter((field) => !payload[field] || String(payload[field]).trim() === '');
}

app.post('/api/contact', (req, res) => {
  const missing = validateRequiredFields(req.body || {}, ['name', 'phone', 'email', 'message']);
  if (missing.length) {
    return res.status(400).json({
      error: `Missing required fields: ${missing.join(', ')}`,
    });
  }

  res.json({
    success: true,
    message: 'Thank you. A care coordinator will contact you shortly.',
  });
});

app.post('/api/careers', (req, res) => {
  const missing = validateRequiredFields(req.body || {}, ['name', 'phone', 'email', 'position', 'experience']);
  if (missing.length) {
    return res.status(400).json({
      error: `Missing required fields: ${missing.join(', ')}`,
    });
  }

  res.json({
    success: true,
    message: 'Application received. Our recruiting team will review your submission.',
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} in use, please choose another port (e.g. PORT=3001).`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
