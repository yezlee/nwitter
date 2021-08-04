import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  // editing, setEditing -> these are telling that we are editing mode or not - true or false.

  const [newNweet, setNewNweet] = useState(nweetObj.text);
  // newNweet, setNewNweet -> these are to update the text of the input

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure to delete this nweet?");
    console.log(ok);
    if (ok) {
      // delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete(); // refFromURL() 이거를 사용해서 url으로부터 ref를 가져오는거야.
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    // 사실 여기서 async는 필요가 없어 어떤 방법을 써도 snapshot 덕분에 업데이트는 확인할 수가 있어서
    e.preventDefault();
    // console.log(nweetObj, newNweet);
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChenge = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Nweet"
              value={newNweet}
              required
              onChange={onChenge}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text} </h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="100px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
