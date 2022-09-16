import React from "react";
import { useHistory } from "react-router-dom";
import Button from "kromac-ui/dist/Button";
import Panel from "kromac-ui/dist/Panel";
import { useQueryParams } from "../util/useQueryParams";

export default function VerificationPage() {
  const history = useHistory();
  const { email } = useQueryParams();

  const veryEmail = async () => {
    try {
      history.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Panel>
        <h1>Verify Email</h1>
        <p>Thanks for Sign up. Please verify to get all the app's features</p>
        <br />
        <Button onClick={veryEmail}>Verify Email</Button>
      </Panel>
    </div>
  );
}
