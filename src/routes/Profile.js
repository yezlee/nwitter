import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
    //  Router.js에서 <Redirect from="*" to="/" /> 이걸 이용하던가
    // 여기서 훅을 이용해서 - useHistory() push해서 리다이렉트 해주던가
  };

  /*
  // 이게 쿼리에 대한 코드
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid) // 이게 where절 사용하는 방법. where 더 추가할수도 있음
      .orderBy("createdAt") // .orderBy("createdAt", "desc") 이렇게 하면 desc근데 다시 index를 추가해야함. 인덱스 추가 안되어있으면 에러떠서  firestore에선 구글 클라우드에다가 인덱스를 추가해주면된다. 에러창에 뜬 주소로 가서 추가하면 됨.
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  */

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
