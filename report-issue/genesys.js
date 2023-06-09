const chatParams = new URLSearchParams(location.search);
const device = chatParams.get('device');
const roomName = chatParams.get('roomname');
const uri = chatParams.get('uri');
const deviceType = chatParams.get('devicetype');

window._genesys = {
    widgets: {
      main: {
        downloadGoogleFont: true,
        googleFontUrl: 'https://apps.usw2.pure.cloud/webfonts/roboto.css',
        theme: 'light'
      },
      webchat: {
        transport: {
          type: 'purecloud-v2-sockets',
          dataURL: 'https://api.usw2.pure.cloud',
          deploymentKey : 'da82457d-4a3e-45d2-a852-1cd7636f3e49',
          orgGuid : '562da0e4-6065-4c91-9973-613e209b8e46',
          interactionData: {
            routing: {
              targetType: 'QUEUE',
              targetAddress: 'Jeffs Test Queue',
              priority: 2
            }
          }
        },
        userData: {
          addressStreet: '64472 Brown Street',
          addressCity: 'Lindgrenmouth',
          addressPostalCode: '50163-2735',
          addressState: 'FL',
          phoneNumber: uri,
          phoneType: deviceType,
          customerId: '59606',
        }
      }
    }
  };
  
  
  const customPlugin = CXBus.registerPlugin('Custom');
  
  customPlugin.subscribe('WebChatService.started', function (e) {
    console.log('Chat started', e);
  });
  
  customPlugin.subscribe('WebChatService.ended', function (e) {
    console.log('Chat ended', e);
  });


function getAdvancedConfig() {
    return {
        form: {
            autoSubmit: false,
            firstname: '',
            lastname: '',
            email: '',
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