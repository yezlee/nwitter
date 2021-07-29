import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  // 여기서 무슨일이 일어나고 있냐면, 이 어플리케이션(App())이 로드될 때, firebase는 사용자가 로그인이 되었는지 아닌지 확인할 시간이 없어.
  // 너무 빨리 일어났기 때문이지. 그래서 이 앱이 시작되면 바로 로그아웃이 되는거야 항상. 그래서 currentUser에는 아무도 없는거지. - This happens immediately. - firebase가 초기화되고 모든걸 로딩할때까지 기다려 줄 시간이 없어서야.

  // console.log(authService.currentUser);

  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);

  // 위와 같은 코드를 작성하면 처음엔 null이나와. 아직 firebase가 로드되기 전이거든. 후에 2초마다 다시 유저를 콘솔에 찍는 serInterval을 실행하면 2초마다 Im {N: Array(0), l: "AIzaSyCzDc1wl8K44BDKDi3TfvSQl8-nnVjGRQo", m: "[DEFAULT]", s: "nwitter-2e915.firebaseapp.com", a: Ii, …} 콘솔에 이렇게 찍힌다.

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedin={isLoggedin} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
