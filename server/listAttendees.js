const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const chime = new AWS.Chime({ region: 'us-east-1' });
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

async function getMeetingAttendees(existingMeetingId) {
  console.log('Listing Attendees for MeetingID:', meetingId)

  var params = {
    MeetingId: meetingId,
    /* required */
  };

  chime.listAttendees(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
}

// slice cuts the processes to get to the correct spot. Bring the process to what is needed to read the file for the meetingId. 
var args = process.argv.slice(2);
var meetingId = args[0];
var fs = require('fs')

try {
  // reads meeting.txt file 
  meetingId = fs.readFileSync('meetingid.txt').toString('utf-8');
}
catch (err) {
  console.log("Unable to read file meetingid.txt:", err.message);
}

getMeetingAttendees(meetingId);
