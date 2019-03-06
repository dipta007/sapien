const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

AWS.config.update({
  accessKeyId: 'AKIAIBDN2ATZWIT454TQ',
  secretAccessKey: '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',
  region: 'us-east-1'
});
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const uploadParams = {
  Bucket: 'sapien007',
  Key: '',
  Body: '',
  ACL: 'public-read'
};

const awsUp = file => {
  uploadParams.Body = file.data;
  uploadParams.Key = `${uuidv4()}-${file.name}`;
  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (data) {
        resolve(data.Location);
      }
    });
  });
};

module.exports = {
  awsUp
};
