import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ refreshUser, isLoggedin, userObj }) => {
  return (
    <Router>
      {isLoggedin && <Navigation userObj={userObj} />}
      {/* isLoggedin - this has to be true, for <Navigation /> happend.  */}
      <Switch>
        {/* 여기서 <Switch>의 역할은 : 한번에 하나씩의 <Route>를 보게해준다.  */}
        {isLoggedin ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile refreshUser={refreshUser} userObj={userObj} />
            </Route>
            {/* <Redirect from="*" to="/" /> */}
          </div>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            {/* 
            <Redirect from="*" to="/" />
            이게 무슨뜻이냐면, 위에 route에 있으면 상관없는데 그 외의 route로 가게되면 여기 "/"로 돌아가라는 의미 */}
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
