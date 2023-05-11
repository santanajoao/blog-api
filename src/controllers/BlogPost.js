const { BlogPostService } = require('../services');
const { CREATED } = require('../constants/statusCodes');
const mapTypeToStatus = require('../utils/mapTypeToStatus');

const handlePostBlogPost = async (req, res) => {
  const authenticationToken = req.get('Authorization');
  const { type, message } = await BlogPostService.createPost({
    authenticationToken, ...req.body,
  });

  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(CREATED).json(message);
};

module.exports = {
  handlePostBlogPost,
};
