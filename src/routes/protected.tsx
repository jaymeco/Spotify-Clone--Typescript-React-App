import React from "react";
import { Redirect, Route } from "react-router";


interface IProps {
  component: React.FC;
  path: string;
  exact: boolean;
}

function ProtectedRoute({ component, exact, path }: IProps) {


  function isAuthenticated() {
    if(localStorage.getItem('token') && localStorage.getItem('generate_token_time')){
      const generatedTime = new Date(localStorage.getItem('generate_token_time') as string);
      const hourAgo = Date.now() - (1000 * 60 * 60);
      if (hourAgo < generatedTime.getTime()) {
        return false;
      } else {
        return true;
      }
    }else {
      return false;
    }
  }

  if (isAuthenticated()) {
    return (
      <Route path={path} exact={exact} component={component} />
    )
  } else {
    return (
      <Redirect to="/" />
    )
  }
}

export default ProtectedRoute;