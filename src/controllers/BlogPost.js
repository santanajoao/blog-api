const { BlogPostService } = require('../services');
const { CREATED, OK } = require('../constants/statusCodes');
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

const handleGetAllPosts = async (req, res) => {
  const token = req.get('Authorization');

  const { type, message } = await BlogPostService.findAllPosts(token);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }

  res.status(OK).json(message);
};

const handleGetPost = async (req, res) => {
  const token = req.get('Authorization');
  const id = Number(req.params.id);

  const { type, message } = await BlogPostService.findPostById(token, id);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(OK).json(message);
};

module.exports = {
  handlePostBlogPost,
  handleGetAllPosts,
  handleGetPost,
};
