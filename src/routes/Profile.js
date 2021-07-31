import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    //  Router.js에서 <Redirect from="*" to="/" /> 이걸 이용하던가
    // 여기서 훅을 이용해서 - useHistory() push해서 리다이렉트 해주던가
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
