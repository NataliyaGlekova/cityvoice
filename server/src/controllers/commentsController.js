const commentsService = require('../services/commentsService');

module.exports = {
  async createComment(req, res) {
    try {
      const comment = await commentsService.createComment(req.body);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getComments(req, res) {
    try {
      const comments = await commentsService.getComments();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCommentById(req, res) {
    try {
      const comment = await commentsService.getCommentById(req.params.id);
      if (!comment) return res.status(404).json({ error: 'Comment not found' });
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateComment(req, res) {
    try {
      const comment = await commentsService.updateComment(req.params.id, req.body);
      res.status(200).json(comment);
    } catch (error) {
      if (error.message === 'Comment not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async deleteComment(req, res) {
    try {
      await commentsService.deleteComment(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Comment not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  async getCommentsByMarker(req, res) {
    try {
      const comments = await commentsService.getCommentsByMarker(req.params.markerId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};