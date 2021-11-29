const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const chime = new AWS.Chime({ region: 'us-east-1' });
const externalMeetingId = 'testMeeting';
chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

async function createNewMeeting(extMeetingId, attendees) {
    var params = {
        ClientRequestToken: uuidv4(),
        /* required */
        Attendees: attendees,
        ExternalMeetingId: extMeetingId,
        MediaRegion: 'us-east-1',
    };
    try {
        const meeting = await chime.createMeetingWithAttendees(params).promise();
        console.log(meeting);
        const meetingId = meeting.Meeting.MeetingId; // meeting ID of the new meeting
        console.log('new meeting id: ' + meetingId);

        // write the meeting id to a meetingid.txt
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
