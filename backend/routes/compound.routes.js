// backend/routes/compound.routes.js
const express = require('express');
const router = express.Router();
const compoundController = require('../controllers/compound.controller');

router.get('/', compoundController.getAllCompounds);

router.get('/:id', compoundController.getCompoundById);

router.put('/:id', compoundController.updateCompound);

module.exports = router;