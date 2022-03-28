import React, { useState } from "react";
import styled from "styled-components";
import { setDoc } from "../firebase";

const Root = styled.div`
  padding: 50px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    width: 100%;
    margin-bottom: 8px;
  }
  textarea {
    width: 100%;
    margin-bottom: 8px;
  }
  button {
    align-self: flex-end;
  }
`;

const PostSong = () => {
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");

  const postData = async () => {
    const res = await setDoc({ collection: "songs", path: email, data: { email, alias, data } });
    setAlias("");
    setEmail("");
    setData("");
  };

  return (
    <Root>
      <Form>
        <label>Alias:</label>
        <input value={alias} onChange={(e) => setAlias(e.currentTarget.value)}></input>
        <label>EMail:</label>
        <input value={email} onChange={(e) => setEmail(e.currentTarget.value)}></input>
        <label>Data:</label>
        <textarea value={data} onChange={(e) => setData(e.currentTarget.value)}></textarea>
      </Form>
      <button onClick={postData}>POST</button>
    </Root>
  );
};

export default PostSong;
