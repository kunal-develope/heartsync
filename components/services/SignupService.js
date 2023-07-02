/* eslint-disable prettier/prettier */
const endPoint = 'http://192.168.1.7:3005';
const postOptions = {
  method: 'POST',
  crossorigin: true,
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};
const getOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};
const loginService = async data => {
  postOptions.body = JSON.stringify(data);
  let response;
  await fetch(endPoint + '/login', postOptions).then(async res => {
    try {
      const jsonRes = await res.json();

      response = jsonRes;
    } catch (err) {
      console.log(err);
    }
  });
  return response;
};
const signupService = async data => {
  postOptions.body = JSON.stringify(data);
  let response;
  await fetch(endPoint + '/signup', postOptions).then(async res => {
    try {
      const jsonRes = await res.json();

      response = jsonRes;
    } catch (err) {
      console.log(err);
    }
  });
  return response;
};

const getUsers = async () => {
  let response;
  await fetch(endPoint + '/getusers', getOptions)
    .then(async res => {
      try {
        const jsonRes = await res.json();
        if (res.status === 200) {
          response = jsonRes.data;
        }
      } catch (err) {
        console.log(err);
      }
    })
    .catch(err => {
      console.log(err);
    });
  return response;
};
const profileService = async data => {
  postOptions.body = JSON.stringify(data);
  let response;
  await fetch(endPoint + '/profile-data', postOptions).then(async res => {
    try {
      const jsonRes = await res.json();

      response = jsonRes.data;
    } catch (err) {
      console.log(err);
    }
  });
  return response;
};
const editProfileService = async data => {
  postOptions.body = JSON.stringify(data);
  let response;
  console.log('postOptions', postOptions);
  await fetch(endPoint + '/update-profile', postOptions).then(async res => {
    try {
      const jsonRes = await res.json();
      console.log(jsonRes);
      response = jsonRes.data;
    } catch (err) {
      console.log(err);
    }
  });
  return response;
};
export {
  signupService,
  getUsers,
  loginService,
  profileService,
  editProfileService,
};
