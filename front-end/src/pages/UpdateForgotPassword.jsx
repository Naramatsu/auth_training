import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "kromac-ui/dist/Button";
import Panel from "kromac-ui/dist/Panel";
import { useQueryParams } from "../util/useQueryParams";

export default function UpdateForgotPassword() {
  const [passwordResetCode, setPasswordResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [success, setSuccess] = useState(false);

  const history = useHistory();
  const { email } = useQueryParams();

  const updatePassword = async () => {
    try {
      await axios.put(`/api/udate-password`, {
        newPassword: password,
        email,
        passwordResetCode,
      });
      setSuccess(true);
      setTimeout(() => {
        history.push("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const isDisabledButton = !password || password !== rePassword;

  return (
    <section>
      <Panel>
        <h1>Update Password</h1>
        {success && (
          <section className="success">
            <p>Your password were update Successfully</p>
          </section>
        )}
        <section>
          <label>Password reset code:</label>
          <input
            type="text"
            placeholder="Password reset code"
            value={passwordResetCode}
            onChange={(e) => setPasswordResetCode(e.target.value)}
          />
        </section>
        <section>
          <label>New Password:</label>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        <section>
          <label>Confirm New Password:</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </section>
        <hr />
        <Button onClick={updatePassword} disabled={isDisabledButton}>
          Update Password
        </Button>
        <Button onClick={() => history.push("/")} color="dark">
          Go toLogin
        </Button>
      </Panel>
    </section>
  );
}
