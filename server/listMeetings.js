const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const chime = new AWS.Chime({ region: 'us-east-1' });
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

var params = {};
chime.listMeetings(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log(data); // successful response – returns array of meeting objects
  }
});
