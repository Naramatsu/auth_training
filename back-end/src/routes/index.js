import { testRoute } from "./testRoute";
import { signUpRoute } from "./signUpRoute";
import { logInRoute } from "./logInRoute";
import { updateUserInfoRoute } from "./updateUserInfo";
import { testEmailRoute } from "./testEmailRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";
import { updatePasswordRoute } from "./updatePasswordRoute";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute";
import { googleOauthCallbackRoute } from "./googleOauthCallbalckRoute";

export const routes = [
  testRoute,
  signUpRoute,
  logInRoute,
  updateUserInfoRoute,
  testEmailRoute,
  verifyEmailRoute,
  resetPasswordRoute,
  updatePasswordRoute,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
];
