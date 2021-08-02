import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  console.log("userObj", userObj);
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

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
  useEffect(() => {
    getNweets();
    dbService.collection("nweets").onSnapshot((snapshot) => {
      console.log("something hapened - read, delete, update...anything");
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
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.text} </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
