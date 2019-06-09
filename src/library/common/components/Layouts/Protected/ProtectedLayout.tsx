import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedLayout: React.FC<any> = ({children, isAuth, location}) => {
  
  if(!isAuth) return <Redirect to={{ pathname: "/auth", state: {from: location.pathname}}} />

  return <div>{children}</div>

};

export default ProtectedLayout;
