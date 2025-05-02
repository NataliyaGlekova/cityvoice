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

  static async editMarker(id, data) {
    try {
      const marker = await Marker.findByPk(id);
      if (!marker) {
        throw new Error('Marker not found');
      }
      marker.name = data.name;
      marker.description = data.description;
      marker.location = data.location;
      await marker.save();
      return marker;
    } catch (error) {
      console.error('Error editing marker:', error);
      throw new Error('Failed to edit marker');
    }
  }

  static async addMarker(data) {
    try {
      const marker = await Marker.create(data);
      return marker;
    } catch (error) {
      console.error('Error adding marker:', error);
      throw new Error('Failed to add marker');
    }
  }

  static async deleteMarker(id) {
    try {
      const marker = await Marker.findByPk(id);
      if (!marker) {
        throw new Error('Marker not found');
      }
      await marker.destroy();
      return marker;
    } catch (error) {
      console.error('Error deleting marker:', error);
      throw new Error('Failed to delete marker');
    }
  }
}
module.exports = MarkerService;
