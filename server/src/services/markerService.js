const { Marker } = require('../../db/models/');

class MarkerService {
  static async getAllMarkers() {
    try {
      const markers = await Marker.findAll();
      return markers;
    } catch (error) {
      console.error('Error fetching markers:', error);
      throw new Error('Failed to fetch markers');
    }
  }
}
module.exports = MarkerService;
