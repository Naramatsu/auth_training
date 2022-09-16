import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useToken from "../auth/useToken";
import Button from "kromac-ui/dist/Button";
import Panel from "kromac-ui/dist/Panel";
import { useQueryParams } from "../util/useQueryParams";

export default function Login() {
  const [, setToken] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  const { token: oauthToken } = useQueryParams();
  const history = useHistory();

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      history.push("/");
    }
  }, [oauthToken, setToken, history]);

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get("/auth/google/url");
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (error) {
        console.log(error);
      }
    };

    loadOauthUrl();
  }, []);

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      const { token } = response.data;
      setToken(token);
      history.push("/");
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  };

  return (
    <div>
      <Panel>
        <h1>Login Page</h1>
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
          <hr />
          <section>
            <Button onClick={onLogin} disabled={!email || !password}>
              Log in
            </Button>
            <Button
              onClick={() => history.push("/forgot-password")}
              color="dark"
            >
              Forgot your password?
            </Button>
            <Button onClick={() => history.push("/signup")} color="info">
              Don't have an accout yet?
            </Button>
            <button
              disabled={!googleOauthUrl}
              onClick={() => (window.location.href = googleOauthUrl)}
            >
              Log in with Google
            </button>
          </section>
        </section>
      </Panel>
    </div>
  );
}
