import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "kromac-ui/dist/Button";
import Panel from "kromac-ui/dist/Panel";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const resetPassword = async (e) => {
    try {
      await axios.put("/api/reset-password", {
        email,
      });
      setSuccess(true);
      setTimeout(() => {
        history.push(
          `/update-forgot-password?email=${encodeURIComponent(email)}`
        );
      }, 3000);
    } catch (error) {
      setErrorMessage("There was an error trying to send the reset link");
    }
    e.preventDefault();
  };

  if (success)
    return (
      <section>
        <Panel>
          <h1>Success</h1>
          <p>Check your email for a reset link</p>
          <button onClick={() => history.push("/")}>Go to Log in</button>
        </Panel>
      </section>
    );

  return (
    <section>
      <Panel>
        <h1>Forgot Password</h1>
        <p>Enter you email and we'll send you a reset link</p>
        {errorMessage && <section className="fail">{errorMessage}</section>}
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
        />
        <hr />
        <Button disabled={!email} onClick={resetPassword}>
          Send Reset Link
        </Button>
        <Button onClick={() => history.push("/")} color="dark">
          Go to Log in
        </Button>
      </Panel>
    </section>
  );
}
