import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserInfoPage } from "./pages/UserInfoPage";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import PrivateRoutes from "./auth/PrivateRoutes";
import VerificationPage from "./pages/VerificationPage";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateForgotPassword from "./pages/UpdateForgotPassword";
import EmailVerificationCode from "./pages/EmailVerificationCode";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoutes path="/" exact>
          <UserInfoPage />
        </PrivateRoutes>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/verify-email" exact>
          <EmailVerificationCode />
        </Route>
        <Route path="/verify-email/:verificationString">
          <VerificationPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/update-forgot-password">
          <UpdateForgotPassword />
        </Route>
      </Switch>
    </Router>
  );
};
