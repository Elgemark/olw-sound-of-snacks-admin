import React, { useEffect, useState } from "react";
import { getDocs } from "../firebase";
import styled from "styled-components";
import _ from "lodash";

const OrderedList = styled.ol`
  text-align: left;
  .num {
    font-weight: bold;
  }
  .alias {
    font-weight: bold;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  button {
    margin-left: 4px;
    margin-right: 4px;
  }
`;

const SongListItem = styled(({ show = true, song, index, checked, onChange, ...rest }) => (
  <li key={song.id} index={index} {...rest}>
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="num">{`${index + 1}.`}</span>
    <span className="alias">{song.alias}</span>
    <span className="email">{song.email}</span>
  </li>
))`
  cursor: pointer;
  display: grid;
  grid-template-columns: 50px 50px 150px 150px;
  grid-template-rows: auto;
  background-color: ${({ index }) => (index % 2 ? "#fff" : "#eee")};
  &:hover {
    background-color: #ffeeff;
  }
`;

const RandomSongItem = ({ song, ...rest }) => {
  if (song) {
    return <SongListItem song={song} {...rest} />;
  } else {
    return <React.Fragment />;
  }
};

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [randomSongIndex, setRandomSongIndex] = useState();

  useEffect(() => {
    getDocs({ collection: "songs" }).then((res) => {
      setSongs(res);
    });
  }, []);

  const onListeItemClickHandler = (songId) => {
    const updatedSongs = [...selectedSongs];
    if (updatedSongs.includes(songId)) {
      _.remove(updatedSongs, (id) => id === songId);
    } else {
      updatedSongs.push(songId);
    }
    setSelectedSongs(updatedSongs);
  };

  const onSelectRandomClickHandler = () => {
    const randomIndex = _.random(0, songs.length - 1);
    setRandomSongIndex(randomIndex);
  };

  return (
    <div>
      <OrderedList>
        {songs.map((song, index) => (
          <SongListItem
            key={song.id}
            song={song}
            index={index}
            checked={selectedSongs.includes(song.id)}
            onChange={() => onListeItemClickHandler(song.id)}
          />
        ))}
      </OrderedList>
      {/* BUTTONS */}
      <Buttons>
        {selectedSongs.length ? <button>DELETE</button> : undefined}
        <button onClick={onSelectRandomClickHandler}>SELECT RANDOM</button>
      </Buttons>
      <OrderedList>
        <RandomSongItem song={songs[randomSongIndex]} index={randomSongIndex} />
      </OrderedList>
    </div>
  );
};

export default Songs;
