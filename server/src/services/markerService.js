const { Marker, Entity } = require('../../db/models/');

class MarkerService {
  static async getAllMarkers(category = 'place') {
    try {
      const markers = await Marker.findAll({
        where: { category },
        include: [
          {
            model: Entity,
            through: { attributes: [] },
            attributes: ['id', 'name', 'description'],
          },
        ],
      });
      return markers;
    } catch (error) {
      console.error('Error fetching markers:', error);
      throw new Error('Failed to fetch markers');
    }
  }

  static async getMarkerById(id) {
    try {
      const marker = await Marker.findByPk(id, {
        include: [
          {
            model: Entity,
            through: { attributes: [] },
            attributes: ['id', 'name', 'description'],
          },
        ],
      });
      if (!marker) {
        throw new Error('Marker not found');
      }
      return marker;
    } catch (error) {
      console.error('Error fetching marker by id:', error);
      throw new Error('Failed to fetch marker');
    }
  }
}
module.exports = MarkerService;
