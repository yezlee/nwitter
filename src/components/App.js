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
        //setUserObj(user); // 이렇게 몽땅 다 userObj에 set하는게 아니고 필요한거 몇개만해. 안그럼 big object가 되서 리액트가 렌더링할때 힘들어함
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }
      // else {
      //   setIsLoggedIn(false);
      // }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    // setUserObj({ displayName: "test" }); 이렇게 하면 displayName에 test가 들어가는데. 왜 {} 이걸 써주지? -> 객체화 시킨거
    console.log(authService.currentUser.displayName);
    console.log(authService.currentUser); // big object가 출력된다. 너무 많아서 리액트가 뭘 렌더링해야하는지 몰라.
    // setUserObj(authService.currentUser); // 그래서 이렇게 쓰면 바로 적용이 안돼. 뭘 렌더링 해야할지 몰라서!

    const user = authService.currentUser;

    // setUserObj(Object.assign({}, user)); //  이것도 가능하긴한데 에러가 날수도 있어...Unhandled Rejection (TypeError): userObj.updateProfile is not a function

    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedin={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter </footer> */}
    </>
  );
}

export default App;
