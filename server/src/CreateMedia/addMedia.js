const uuidv4 = require('uuid/v4');
const knex = require('../knex');

const addMedia = async (thumbUrl, coverUrl = null) => {
  const id = uuidv4();
  let sql = `INSERT into media (mediaid, mediathumbnail) values ('${id}', '${thumbUrl}')`;
  if (coverUrl) {
    sql = `INSERT into media (mediaid, mediacover, mediathumbnail) values ('${id}', '${coverUrl}', '${thumbUrl}')`;
  }
  try {
    await knex.raw(sql);
    return id;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  addMedia
};
