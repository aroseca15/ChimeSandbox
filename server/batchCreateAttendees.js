const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const chime = new AWS.Chime({ region: 'us-east-1' });
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

// 7-16 are a helper function which creates new attendees in an existing meeting from a list with a single API call.
async function createAttendees(existingMeetingId, attendees) {
  var params = {
    Attendees: attendees,
    MeetingId: existingMeetingId,
  };
  chime.batchCreateAttendee(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
};

var args = process.argv.slice(2);
var meetingId = args[0];
var fs = require('fs')

try {
    // reading the latest meetingID from the file our createMeeting.js app created.
  meetingId = fs.readFileSync('meetingid.txt').toString('utf-8');
}
catch (err) {
  console.log("Unable to read file meetingid.txt:", err.message);
}

console.log('Creating Attendees for MeetingID:', meetingId);

// creates four new users with the helper function
const meetingAttendees = [
  { ExternalUserId: 'user3' },
  { ExternalUserId: 'user4' },
  { ExternalUserId: 'user5' },
  { ExternalUserId: 'user6' },
];
createAttendees(meetingId, meetingAttendees);
