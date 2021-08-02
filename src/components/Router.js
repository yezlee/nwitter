import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedin, userObj }) => {
  return (
    <Router>
      {isLoggedin && <Navigation />}
      {/* isLoggedin - this has to be true, for <Navigation /> happend.  */}
      <Switch>
        {isLoggedin ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            {/* <Redirect from="*" to="/" /> */}
          </>
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
