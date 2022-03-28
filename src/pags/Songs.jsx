import React, { useEffect, useState } from "react";
import { getDocs } from "../firebase";
import styled from "styled-components";

const OrderedList = styled.ol`
  text-align: left;
  li {
  }
  .num {
    font-weight: bold;
  }
  .alias {
    font-weight: bold;
  }
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 50px 150px 150px;
  grid-template-rows: auto;
  background-color: ${({ index }) => (index % 2 ? "#fff" : "#eee")};
`;

const Songs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getDocs({ collection: "songs" }).then((res) => {
      setSongs(res);
    });
  }, []);

  return (
    <div>
      <OrderedList>
        {songs.map((song, index) => (
          <ListItem key={song.id} index={index}>
            <span className="num">{`${index + 1}.`}</span>
            <span className="alias">{song.alias}</span>
            <span className="email">{song.email}</span>
          </ListItem>
        ))}
      </OrderedList>
    </div>
  );
};

export default Songs;
