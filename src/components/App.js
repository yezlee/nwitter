import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  console.log(authService.currentUser); // 지금은 이걸 하면 nul로 나와. 당연히 현재유저가 없으니까. 그래서 이걸 아래 useState에 넣어주는거지
  const [isLoggedin, setIsLoggedIn] = useState(authService.currentUser); // 이러면 유저가 로그인을 했는지 안했는지 알수있지.

  return (
    <>
      <AppRouter isLoggedin={isLoggedin} />;
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
