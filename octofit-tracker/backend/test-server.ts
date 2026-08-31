import express from 'express';

const app = express();
const port = 8001;

app.get('/test', (_req, res) => {
  console.log('GET /test called');
  res.json({ message: 'test works' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Test server listening on port ${port}`);
});
