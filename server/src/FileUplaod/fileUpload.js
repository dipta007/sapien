const AWS = require('./awsFileUpload');
const Axios = require('../Axios');

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
      let id = await Axios.post('/graphql', {
        query: `
          mutation addMedia {
            addMedia(thumbUrl: "${values[0]}", 
            coverUrl: "${values[1] ? values[1] : ''}") 
          }
        `
      });

      id = id.data.data.addMedia;

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
