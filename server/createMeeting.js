const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const chime = new AWS.Chime({ region: 'us-east-1' }); // Control Plane Region...the region for the control plane of the Amazon Chime API should always be ‘us-east-1’.
const extMeetingId = 'testMeeting'; // + uuidv4().substring(0, 4)
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

async function createNewMeeting() {
  const requestId = uuidv4();
  const region = 'us-east-1'; // Media Region
  try {
    // 12-17 create the meeting
    const meeting = await chime.createMeeting({
      ClientRequestToken: requestId,
      MediaRegion: region,
      ExternalMeetingId: extMeetingId,
    }).promise();
    console.log(meeting);

    const meetingId = meeting.Meeting.MeetingId; // meeting ID of the new meeting
    console.log('new meeting id: ' + meetingId);

    // write the meeting id to meetingid.txt... writes the most recent meeting ID to a file named meetingid.txt for other apps to use.
    var fs = require('fs');
    fs.writeFile('meetingid.txt', meetingId, function(err) {
      if (err) return console.log(err);
      console.log('meetingId > meetingId.txt');
    });
  }
  catch (err) {
    console.log('createMeeting failed: ' + err.message);
  }
}

createNewMeeting();
