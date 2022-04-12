import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useGetUser } from "../firebase";

const Login = ({ uiConfig, children }) => {
  const { user, isLoading: isLoadingUser } = useGetUser({ skip: !uiConfig });

  if (!uiConfig) {
    return null;
  }

  if (isLoadingUser) {
    return "...loading";
  }

  if (user) {
    return children;
  }

  return (
    <div id="firebaseui-auth-container">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default Login;
