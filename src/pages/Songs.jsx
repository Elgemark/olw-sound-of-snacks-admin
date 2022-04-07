import React, { useState, useEffect } from "react";
import { deleteDoc } from "../firebase";
import styled from "styled-components";
import _ from "lodash";
import { getDocs } from "../firebase";
import { orderBy } from "firebase/firestore";
import SongListItem from "../components/SongListItem";

const _mockSongs = [
  { alias: "test-1", email: "elgemark@gmail.com" },
  { alias: "test-2", email: "elgemark@gmail.com" },
  { alias: "test-3", email: "elgemark@gmail.com" },
  { alias: "test-4", email: "elgemark@gmail.com" },
  { alias: "test-5", email: "elgemark@gmail.com" },
];

const Root = styled.div`
  padding: 1rem;
`;

const OrderedList = styled.ol`
  margin-bottom: 1rem;
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
  margin-bottom: 1rem;
  button {
    margin-left: 4px;
    margin-right: 4px;
  }
`;

const RandomSongItem = ({ song, ...rest }) => {
  if (song) {
    return <SongListItem song={song} {...rest} />;
  } else {
    return <React.Fragment />;
  }
};

const Songs = ({ limit = 2 }) => {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [randomSongIndex, setRandomSongIndex] = useState();
  const [songs, setSongs] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    // get songs
    // getDocs({ collection: "songs", query: [orderBy("createdAt", "asc")] }).then((res) => {
    getDocs({ collection: "songs" }).then((res) => {
      setSongs(res);
    });
    setSongs(_mockSongs);
  }, []);

  const paginate = (value) => {
    setSkip(skip + value);
  };

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

  const onDeleteClickHandler = () => {
    const promises = selectedSongs.map((songId) => deleteDoc({ collection: "songs", path: songId }));
    Promise.all(promises).then(() => {
      setSelectedSongs([]);
    });
  };

  return (
    <Root>
      <OrderedList>
        {songs.slice(skip, skip + limit).map((song, index) => (
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
        {skip > 0 && (
          <button
            onClick={() => {
              paginate(limit * -1);
            }}
          >
            {"<< PREVIOUS"}
          </button>
        )}
        {selectedSongs.length ? <button onClick={onDeleteClickHandler}>DELETE</button> : undefined}
        <button onClick={onSelectRandomClickHandler}>SELECT RANDOM</button>

        <button
          onClick={() => {
            paginate(limit);
          }}
        >
          {"NEXT >>"}
        </button>
      </Buttons>
      {/* RANDOM */}
      <OrderedList>
        <RandomSongItem checkBox={false} color="#eee" song={songs[randomSongIndex]} index={randomSongIndex} />
      </OrderedList>
    </Root>
  );
};

export default Songs;
