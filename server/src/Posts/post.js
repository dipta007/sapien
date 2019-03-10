const knex = require('../knex');

const upvote = async (req, res) => {
  const { postId } = req.params;

  await knex.raw(
    `UPDATE posts SET upvotes = upvotes + 1 WHERE postid = '${postId}'`
  );

  return res.status(200).send('sda');
};

const downvote = async (req, res) => {
  const { postId } = req.params;

  await knex.raw(
    `UPDATE posts SET downvotes = downvotes + 1 WHERE postid = '${postId}'`
  );

  return res.status(200).send('sda');
};

module.exports = {
  upvote,
  downvote
};
