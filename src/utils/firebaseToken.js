const { google } = require('google-auth-library');
const serviceAccount = require('../../android/app/'); // Adjust the path

async function getAccessToken() {
  const client = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  });

  try {
    const accessToken = await client.authorize();
    return accessToken.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Call this function to get the access token
getAccessToken()
  .then((token) => {
    console.log('Access Token:', token);
  })
  .catch((error) => {
    console.error('Failed to obtain access token:', error);
  });
