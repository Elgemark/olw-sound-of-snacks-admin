import React, { useEffect, useState } from "react";
import { init, getDocs } from "../firebase";
import styled from "styled-components";

const OrderedList = styled.ol`
  text-align: left;
  li {
    display: grid;
    grid-template-columns: 50px 150px 150px;
    grid-template-rows: auto;
  }
  .num {
    font-weight: bold;
  }
  .alias {
    font-weight: bold;
  }
`;

const Songs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    init();
    getDocs({ collection: "songs" }).then((res) => {
      setSongs(res);
    });
  }, []);

  return (
    <div>
      <OrderedList>
        {songs.map((song, index) => (
          <li key={song.id}>
            <span className="num">{`${index + 1}.`}</span>
            <span className="alias">{song.alias}</span>
            <span className="email">{song.email}</span>
          </li>
        ))}
      </OrderedList>
    </div>
  );
};

export default Songs;
