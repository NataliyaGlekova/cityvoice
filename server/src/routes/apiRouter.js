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

apiRouter.get('/markers/:id', async (req, res) => {
  try {
    const marker = await MarkerService.getMarkerById(req.params.id);
    res.json(marker);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

apiRouter.put('/markers/:id', async (req, res) => {
  try {
    const marker = await MarkerService.editMarker(req.params.id, req.body);
    res.json(marker);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

apiRouter.post('/markers', async (req, res) => {
  try {
    const marker = await MarkerService.addMarker(req.body);
    res.json(marker);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

apiRouter.delete('/markers/:id', async (req, res) => {
  try {
    const marker = await MarkerService.deleteMarker(req.params.id);
    res.json(marker);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = apiRouter;
