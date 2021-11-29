const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const chime = new AWS.Chime({ region: 'us-east-1' });
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

// 7-24 are a helper function which creates a new attendee in an existing meeting.
async function createAttendee(existingMeetingId, userName) {
  try {
    const attendee = (await chime.createAttendee({
      // The meeting ID of the created meeting to add the attendee to
      MeetingId: existingMeetingId,
      ExternalUserId: userName,
    }).promise());

    console.log("New AttendeeID created:", userName, attendee.Attendee.AttendeeId)
    console.log();

  }
  catch (err) {
    // handle error - you can retry with the same externalUserId
    console.log("Unable to create attendee:", err.message);
    return null; // attendee ID of new attendee
  }
}

var args = process.argv.slice(2);
var meetingId = args[0]
var fs = require('fs')

try {
  meetingId = fs.readFileSync('meetingid.txt').toString('utf-8');
}
catch (err) {
  console.log("Unable to read file meetingid.txt:", err.message);
}

console.log('Creating Attendee for MeetingID:', meetingId);
console.log();

//creates two new users, user0 and user1 in that meeting.
createAttendee(meetingId, 'user0');
createAttendee(meetingId, 'user1');
