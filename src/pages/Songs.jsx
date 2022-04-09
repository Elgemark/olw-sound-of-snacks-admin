import React, { useState, useEffect } from "react";
import { deleteDoc } from "../firebase";
import styled from "styled-components";
import _ from "lodash";
import SongListItem from "../components/SongListItem";
import { useGetSongs } from "../hooks/songs";

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

const Songs = ({ limit = 20 }) => {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [randomSongIndex, setRandomSongIndex] = useState();
  const [skip, setSkip] = useState(0);
  const songs = useGetSongs({ limit, skip });

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
        {songs.map((song, index) => (
          <SongListItem
            key={song.id}
            song={song}
            index={song.index}
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
