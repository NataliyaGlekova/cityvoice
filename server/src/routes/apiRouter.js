const express = require('express');
const MarkerService = require('../services/markerService');
const apiRouter = express.Router();

apiRouter.get('/markers', async (req, res) => {
  try {
    const markers = await MarkerService.getAllMarkers();
    res.json(markers);
  } catch (error) {
    console.error('Error fetching markers:', error);
    res.status(500).json({ message: 'Failed to fetch markers' });
  }
});

apiRouter.get('/markers/:id', async (req, res) => {
  try {
    const marker = await MarkerService.getMarkerById(req.params.id);
    res.json(marker);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = apiRouter;