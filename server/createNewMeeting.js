const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const chime = new AWS.Chime({ region: 'us-east-1' }); //region for the control plane of the Amazon Chime API should always be ‘us-east-1’.
const externalMeetingId = 'testMeeting';
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

// Lines 8-32 is a helper function that creates the meeting with attendees (up to 10).
async function createNewMeeting(extMeetingId, attendees) {
    var params = {
        ClientRequestToken: uuidv4(),
        /* required */
        Attendees: attendees,
        ExternalMeetingId: extMeetingId,
        MediaRegion: 'us-east-1',
    };
    try {
        // creates the meeting
        const meeting = await chime.createMeetingWithAttendees(params).promise();
        console.log(meeting);
        const meetingId = meeting.Meeting.MeetingId; // meeting ID of the new meeting
        console.log('new meeting id: ' + meetingId);

        // 24-28 writes he most recent meeting ID to a file named meetingid.txt for other apps to use.
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

const meetingAttendees = [
    { ExternalUserId: 'user0' },
    { ExternalUserId: 'user1' },
];
createNewMeeting(externalMeetingId, meetingAttendees);
