import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    // onChange를 아래 돔에 줬잖아. 그래서 뭔가 바뀔때마다 onChange가 실행됨.
    // 그때마다 event.target.name이 email인지 password인지 확인해서 setEmail or setPassword해주는거지!

    // here EVENT means "What is just happened?" What happened is the input has changed.
    // Event has a lot of information, one of them is target which is what was the change?

    // Everytime I change the input, the state changes too.

    // console.log(event.target.name);
    // console.log(event.target.value);
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    // 이렇게 하는 이유는 onChange를 두개 만들기 싫어서. - 이메일,패스워드 둘다 만들기 싫어서
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // -> It means, let me handle that.
    // 이걸 하는 이유는, Everytime submit a form using normal HTML, the website gets refreshed.
    // and when it is refreshed all the react code goes away, all the state goes away
    // 일반 html을 폼을 서브밋할때 새로고침되는데 - 그러면서 url뒤에 ?email=test&password=1234 이런식으로 뜨지.
    // 이렇게 새로고침을 하면 리액트도 새로고침되고 코드가 다 날라감.

    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  // 이거 버튼처럼 만들어놓은건데 클릭하면 두개값이 그냥 계속 바뀌는거
  // 이거에 따라서 <input type="submit" value={newAccount ? "Create Account" : "Log In"} /> 이 값이 바뀐다. setNewAccount를 바꾸는 거니까.

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue whth Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
