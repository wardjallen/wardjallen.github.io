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


const customPlugin = CXBus.registerPlugin('Custom');

customPlugin.subscribe('WebChatService.started', function (e) {
  console.log('Chat started', e);
});

customPlugin.subscribe('WebChatService.ended', function (e) {
  console.log('Chat ended', e);
});



const dataModel = {
  theme: 'ironbow',
  step: 'start',
  answers: {
    comments: '',
    name: '',
  },
  createIncident: false,
  incidentNumber: false,
  roomName: 'Unknown room',
  showQr: false,
  busy: false,

  

  init() {
    const params = new URLSearchParams(location.search);
    const askRating = params.get('askrating');
    this.step = askRating ? 'start' : 'whatwaswrong';
    this.theme = params.get('theme') || '';
    this.roomName = params.get('roomname');
    this.device = params.get('device');
    this.createQrCode();
  },

  createQrCode() {
    const url = location.href;
    new QRCode(document.getElementById("qr-code"), url);
  },

  answer(step, choice) {
    this.answers[step] = choice;
    if (step === 'start') {
      if (choice === 'notgood') {
        this.step = 'whatwaswrong';
      }
      else {
        this.step = 'done';
      }
    }
    else if (step === 'whatwaswrong') {
      this.step = 'moreinfo';
    }
  },

  back() {
    if (this.step === 'moreinfo') {
      this.step = 'whatwaswrong';
    }
  },
  async submit() {
    const { whatwaswrong, comments, name } = this.answers;
    const { roomName, device } = this;
    this.createIncident = true;
    this.busy = true;
    this.incidentNumber = await createReport(whatwaswrong, comments, name, roomName, device);
    this.busy = false;
    console.log('created', this.incidentNumber);
    this.step = 'done';
    this.notifyWithWebex(this.incidentNumber, whatwaswrong, comments, name, roomName, device);
  },
  async notifyWithWebex(id, category, comments, name, roomName, device) {
    const params = new URLSearchParams(location.search);
    const bot = params.get('webextoken');
    const notify = params.get('notify');
    const instance = params.get('i');

    console.log({ bot, notify });
    const url = `${instance}.service-now.com`;
    let msg = `New ServiceNow incident created\n`;
    msg += `\n* Id: **${id}**`;
    msg += `\n* Category: **${category}**`;
    msg += `\n* comments: **${comments}**`;
    msg += `\n* Room: **${roomName}**`;
    msg += `\n* Device: **${device}**`;
    msg += `\n* Reporter: **${name}**`;
    msg += `\n\nYou can log in to [${url}](https://${url}) to view the details.`;

    if (bot && notify) {
      try {
        await sendMessage(bot, notify, msg);
      }
      catch(e) {
        alert('Unable to send Webex message to ' + notify);
        console.log(e);
      }
    }
  }
}
      
