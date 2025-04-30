const { Marker } = require('../../db/models/');

class MarkerService {
  static async getAllMarkers(category = 'place') {
    try {
      const markers = await Marker.findAll({ where: { category } });
      return markers;
    } catch (error) {
      console.error('Error fetching markers:', error);
      throw new Error('Failed to fetch markers');
    }
  }
}
module.exports = MarkerService;
