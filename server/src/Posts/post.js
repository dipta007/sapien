const knex = require('../knex');

const parsePost = element => {
  const tmp = { ...element };
  const obj = {};
  obj.author = {
    id: element.userid,
    thumbnail: element.userthumbnail,
    username: element.username
  };
  obj.media = {
    id: element.mediaid,
    thumbnail: element.mediathumbnail,
    cover: element.mediacover
  };
  obj.id = element.postid;

  delete tmp.postid;
  delete tmp.userid;
  delete tmp.userthumbnail;
  delete tmp.username;
  delete tmp.mediaid;
  delete tmp.mediathumbnail;
  delete tmp.mediacover;

  return {
    ...obj,
    ...element
  };
};

const getAll = async (req, res) => {
  let sql = 'select * from posts natural join media natural join users order by ';
  if (req.query.sort === 'Most Voted') {
    sql += '(upvotes - downvotes) desc';
  } else sql += 'username asc';
  const sqlResult = await knex.raw(sql);
  const results = sqlResult.rows.map(element => parsePost(element));
  res.status(200).send(results);
};

const getPost = async (req, res) => {
  const id = req.params.postId;
  const sqlResult = await knex.raw(
    `select * from posts natural join media natural join users where postid = '${id}'`
  );
  const results = [];
  if (sqlResult.rows.length > 0) {
    results.push(parsePost(sqlResult.rows[0]));
  }
  res.status(200).send(results);
};

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
  getAll,
  getPost,
  upvote,
  downvote
};
