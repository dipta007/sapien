const knex = require('../knex');

const addPost = async (req, res) => {
  const payload = req.body;
  const sql = `INSERT INTO posts (postid, title, description, userid, createdat, upvotes, downvotes, mediaid) values
                ('${payload.postId}', '${payload.title}', '${
  payload.description
}', '${payload.author}', '${payload.createdAt}',
${payload.upvotes}, ${payload.downvotes}, '${payload.mediaId}')`;
  await knex.raw(sql);
  return res.status(200).send('ok');
};

module.exports = {
  addPost
};
