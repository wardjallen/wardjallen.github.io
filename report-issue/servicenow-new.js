const params = new URLSearchParams(window.location.search);

const servicenow = {
  instance: params.get('i'),
  username: params.get('u'),
  password: params.get('p'),
};

function basicAuth(user, password) {
  return "Basic " + btoa(user + ":" + password);
}

// Prepares the incident report
async function createReport(issueCategory, comment, person, room, device) {

  const title = issueCategory + ' / ' + room;
  const incident = {
    "assignment_group": "MeetingRoom",
    "short_description": title,
    "urgency": "2",
    "impact": "2",
    "description": `User Comment: ${comment} \nUser Name: ${person} \nRoom: ${room} \nDevice: ${device}`,
  };

  const { instance, username, password } = servicenow;

  // Send the incident payload to ServiceNow
  const url = `https://${instance}.service-now.com/api/now/table/incident`;
  const body = JSON.stringify(incident);
  const headers = new Headers();
  headers.append("Authorization", "Basic YWRtaW46WGVAXjM5ZUVBN0w=");
  headers.append("Content-Type", "application/json");
  headers.append("Cookie", "BIGipServerpool_dev147948=864465930.53566.0000; JSESSIONID=AB98D1600B5B2F28332C29E1683BF371; glide_session_store=DCE7CAD897F92150538330C11153AFEB; glide_user_route=glide.47eb8ebe42faf2f1d4be0672c1a87ec1");
  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Authorization': basicAuth(username, password),
  // }

  const options = {
    headers: headers,
    method: 'POST',
    body: body,
    redirect: 'follow'
  };

  if (!instance || !username || !password) {
    alert('Missing ServiceNow instance, username or password');
    return;
  }

  console.log('servicenow:', instance, username, password);

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      console.error('Error:', res.text());
      return false;
    }
    const json = await res.json();
    const number = json?.result?.number;
    return number;
  }
  catch(e) {
    console.error('error', e);
    return false;
  }
}