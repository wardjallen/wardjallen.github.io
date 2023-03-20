const chatParams = new URLSearchParams(location.search);
const device = chatParams.get('device');
const roomName = chatParams.get('roomname');


function getAdvancedConfig() {
    return {
        form: {
            autoSubmit: false,
            firstname: 'Praenomen',
            lastname: 'Gens',
            email: 'praenomen.gens@calidumlitterae.com',
            subject: 'Issue with ' + device
        },
        formJSON: {
            wrapper: '<table></table>',
            inputs: [
                // Default fields
                {
                    id: 'cx_webchat_form_firstname',
                    name: 'firstname',
                    maxlength: '100',
                    placeholder: 'Required',
                    label: 'First Name'
                },
                {
                    id: 'cx_webchat_form_lastname',
                    name: 'lastname',
                    maxlength: '100',
                    placeholder: 'Required',
                    label: 'Last Name'
                },
                {
                    id: 'cx_webchat_form_email',
                    name: 'email',
                    maxlength: '100',
                    placeholder: 'Optional',
                    label: 'Email'
                },
                {
                    id: 'cx_webchat_form_subject',
                    name: 'subject',
                    maxlength: '100',
                    placeholder: 'Optional',
                    label: 'Subject'
                },
                // Custom Fields
                {
                    id: 'roomName',
                    name: 'roomName',
                    maxlength: '100',
                    placeholder: 'Optional',
                    label: 'Room Name',
                    value: roomName
                }
            ]
        }
    };
}