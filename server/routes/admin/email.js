const express = require('express');
const router = express.Router();

router.post('/admin/api/email', async (req, res) => {
    sendEmail(req.body);
    res.send({
      ok: 'ok',
    });
  });

  module.exports = router;