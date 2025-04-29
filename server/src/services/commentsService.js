const { Comment } = require('../../db/models');

module.exports = {
  async createComment(data) {
    return Comment.create(data);
  },

  async getComments() {
    return Comment.findAll();
  },

  async getCommentById(id) {
    return Comment.findByPk(id);
  },

  async updateComment(id, data) {
    const [updated] = await Comment.update(data, { where: { id } });
    if (!updated) throw new Error('Comment not found');
    return Comment.findByPk(id);
  },

  async deleteComment(id) {
    const deleted = await Comment.destroy({ where: { id } });
    if (!deleted) throw new Error('Comment not found');
  },

  async getCommentsByMarker(markerId) {
    return Comment.findAll({ where: { markerId } });
  },
};
