const express = require('express');

const router = express.Router();

router.get('/', (_, res) => {
    res.status(200).json({ isOnline: true });
});

module.exports = router;