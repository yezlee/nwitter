import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  console.log("userObj", userObj);
  const [nweet, setNweet] = useState(""); // this state is only for the form.
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

  /*

  이 방법은 오래된 트윗을 갖고 오는 방법임. 
  새롭게 업데이트 되는걸 갖고 오는게 아니고.
  그냥 아래 useEffect() 안에다가 바로 적을거야.

  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    // console.log(dbNweets); 이렇게 얘를 갖고 오면 T라는 것을 갖고오는데 이건 querySnapChat이라는거고 그건 많은걸 갖고있지
    // docs, empty, metadata,query, size, docChanges(), forEach(), isEqual()... 여기서 내가 원하는걸 갖고 오면 됨

    dbNweets.forEach((document) => {
      // console.log(document.data())
      // forEach로 nweets(state)안에 있는 document.data를 가져오는거야.

      const nweetObject = {
        // 콘솔에 찍어보면 nweet: "I am still hungry", createdAt: 1627805238146, id: "ukPtkFCdbYXzXsXXA4Qr"
        ...document.data(), // ... this is basically the content of the data.
        id: document.id,
      };
      console.log("nweetObject!!", nweetObject);

      setNweets((prev) => [nweetObject, ...prev]);

      console.log("data2", document.data());
      // set이 붙는 함수를 쓸때, 값 대신에 함수를 전달할 수 있다. 만약 함수를 전달하면, 리액트는 이전 값에 접근할수 있게 해준다 -dbNweets에 있는 모든 document에 대해서.
      // 여기선 함수를 전달해서 배열을 리턴하는 것임. 첫번째 요소는 가장 최근 document이고 - document.data() 그 뒤로 이전 document(...prev)를 가져오는것임.
    });
  };

  
    1. dbService.collection("nweets").get() 이렇게 해서 데이터를 가져오는 방법이나 - querySnapChat 사용
        - forEach()를 해서 이걸 사용하면 새로고침해야지 새로운 데이터를 가져오는건가? 오래된 트윗만 가져오는거라고 했으니까
        근데 snapshot를 하면 실시간이 가능!

    2. 아래 useEffect() 에서 한것처럼 onSnapshot을 사용하거나 내 맘이야. 근데 이건 re-render안해도돼. 그래서 더 빠르게 실행되도록 만들어줄거야.
        - 그리고 이건 리렌더링 안해도 되니까!!! 아 그래서 바로 실시간으로 가능하다는거구나




  */

  // Thanks to this we can tweet on realtime
  useEffect(() => {
    //getNweets();
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("nweetArray", nweetArray);
      console.log("snapshot", snapshot.docs); // 여기서 snapshot은 우리가 갖고 있는 쿼리랑 같음. t {_firestore: t, _delegate: t} 이렇게 뜨는거
      setNweets(nweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  console.log("nweets", nweets);

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader(); // FileReader API를 불러오는 방법
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />

        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="100px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
