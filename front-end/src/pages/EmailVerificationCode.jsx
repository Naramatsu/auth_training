import React, { useState } from "react";
import axios from "axios";
import useToken from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams";
import Panel from "kromac-ui/dist/Panel";
import Button from "kromac-ui/dist/Button";
import { useHistory } from "react-router-dom";
export default function EmailVerificationCode() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const [verificationString, setVerificationString] = useState("");
  const { email } = useQueryParams();
  const [, setToken] = useToken();
  const history = useHistory();

  const onVerificationSubmit = async (e) => {
    try {
      const response = await axios.put("/api/verify-email", {
        email,
        verificationString,
      });
      const { token } = response.data;
      setToken(token);
      setIsSuccess(true);
      setTimeout(() => {
        history.push("/reset-password");
      }, 3000);
    } catch (error) {
      console.log(error);
      setIsFailure(true);
    }
    e.preventDefault();
  };

  if (isSuccess) return <div className="success">Success</div>;
  if (isFailure) return <div className="fail">Failed</div>;

  return (
    <div>
      <Panel>
        <h1>Please very your email</h1>
        <p>
          You should receive a verification code at the email address you
          provided.
        </p>
        <p>Please enter it here: </p>
        <input
          type="text"
          value={verificationString}
          onChange={(e) => setVerificationString(e.target.value)}
        />
        <Button onClick={onVerificationSubmit}>Submit</Button>
      </Panel>
    </div>
  );
}
