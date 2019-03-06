const AWS = require('./awsFileUpload');
const { addMedia } = require('../CreateMedia/addMedia');

const fileUp = async (req, res) => {
  const files = req.files.file;
  const promises = [];
  if (!req.files.file.length) {
    promises.push(AWS.awsUp(files));
  } else {
    promises.push(AWS.awsUp(files[0]));
    promises.push(AWS.awsUp(files[1]));
  }

  Promise.all(promises)
    .then(async values => {
      const id = await addMedia(values[0], values[1]);
      if (id) res.status(200).send(id);
      else res.status(500).send('not uploaded');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('not uploaded');
    });
};

module.exports = {
  fileUp
};
