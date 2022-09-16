import React from "react";
import { Redirect, Route } from "react-router-dom";
import useUser from "./useUser";

export default function PrivateRoutes(props) {
  const user = useUser();
  if (!user) return <Redirect to="/login" />;
  return <Route {...props} />;
}
