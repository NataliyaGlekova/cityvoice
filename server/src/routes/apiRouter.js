const express = require('express');
const MarkerService = require('../services/markerService');
const apiRouter = express.Router();

apiRouter.get('/markers', async (req, res) => {
  try {
    const category = req.query.category || 'place';
    console.log(`Fetching markers for category: ${category}`);
    const markers = await MarkerService.getAllMarkers(category);
    res.json(markers);
  } catch (error) {
    console.error('Error fetching markers:', error);
    res.status(500).json({ message: 'Failed to fetch markers' });
  }
});

module.exports = apiRouter;
