import { oauthClient } from "./oAuthClient";

export const getGoogleOauthUrl = () => {
  const scope = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  return oauthClient.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope
  })
};
