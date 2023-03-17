window._genesys = {
      widgets: {
      	main: {
      		downloadGoogleFont: true,
      		googleFontUrl: 'https://apps.usw2.pure.cloud/webfonts/roboto.css'
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
            phoneNumber: '1-916-892-2045 x293',
            phoneType: 'Cell',
            customerId: '59606',
            // These fields should be provided via advanced configuration
            // firstName: 'Praenomen',
            // lastName: 'Gens',
            // email: 'praenomen.gens@calidumlitterae.com',
            // subject: 'Chat subject'
          }
        }
      }
    };