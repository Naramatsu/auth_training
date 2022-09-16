import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useToken from "../auth/useToken";
import Button from "kromac-ui/dist/Button";
import Panel from "kromac-ui/dist/Panel";

export default function SignUp() {
  const [, setToken] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const history = useHistory();
  const validatePassword = password === rePassword;
  const isDisabled = !email || !password || !validatePassword;

  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/signup", {
        email,
        password,
      });
      const { token } = response.data;
      setToken(token);
      history.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <Panel>
        <h1>Sign Up Page</h1>
        <section>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="example@example.com"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="password"
          />
          <input
            onChange={(e) => setRePassword(e.target.value)}
            value={rePassword}
            type="password"
            placeholder="password"
          />
          {!validatePassword && <label>Passwords does not match</label>}
          <hr />
          <section>
            <Button onClick={onSignUp} disabled={isDisabled}>
              Register
            </Button>
            <Button onClick={() => history.push("/login")} color="info">
              Already have an account?
            </Button>
          </section>
        </section>
      </Panel>
    </div>
  );
}
