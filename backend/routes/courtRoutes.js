// backend/routes/courtRoutes.js
const express = require('express');
const router = express.Router();
const courtController = require('../controllers/courtController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', courtController.getCourts);
router.post('/', protect, courtController.createCourt);
router.get('/:id', courtController.getCourtById);
router.post('/:id/book', protect, courtController.bookCourt);
router.put('/:id', protect, courtController.updateCourt);
router.delete('/:id', protect, courtController.deleteCourt);

module.exports = router;
