import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedin, setIsLoggedIn] = useState(false); // isLoggedin={isLoggedin} 이거를 isLoggedin={Boolean(userObj)} 이걸로 바꿔서 필요가 없어짐.
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj(user);
      }
      // else {
      //   setIsLoggedIn(false);
      // }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedin={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
