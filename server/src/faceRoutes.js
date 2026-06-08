const router = require('express').Router();
const https = require('https');
const prisma = require('./prisma');
const auth = require('./authMiddleware');

router.post('/detect', auth, async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) return res.status(400).json({ error: 'imageUrl required' });

  const postData = JSON.stringify({ photo: imageUrl });
  const options = {
    hostname: 'api.luxand.cloud',
    path: '/photo/detect',
    method: 'POST',
    headers: {
      'token': process.env.LUXAND_API_KEY,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => (data += chunk));
    apiRes.on('end', async () => {
      try {
        const result = JSON.parse(data);
        await prisma.user.update({
          where: { id: req.user.id },
          data: { entries: { increment: 1 } },
        });
        res.json(result);
      } catch {
        res.status(500).json({ error: 'Failed to parse API response' });
      }
    });
  });

  apiReq.on('error', () => res.status(500).json({ error: 'Face API error' }));
  apiReq.write(postData);
  apiReq.end();
});

module.exports = router;
