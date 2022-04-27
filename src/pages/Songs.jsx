import React, { useState } from "react";
import { deleteDoc } from "../firebase";
import styled from "styled-components";
import _ from "lodash";
import SongListItem from "../components/SongListItem";
import { useGetSongs } from "../hooks/songs";
import moment from "moment";

const Root = styled.div`
  padding: 1rem;
`;

const OrderedList = styled.ol`
  margin-bottom: 1rem;
  text-align: left;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 2rem;
  button {
    margin-left: 4px;
    margin-right: 4px;
  }
`;

const Songs = ({ limit = 20 }) => {
  const [selectedSongs, setSelectedSongs] = useState([]);
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
            alias={song.alias}
            date={song.servertime && moment.utc(song?.servertime?.seconds * 1000).format("YYYY:MM:DD HH:mm")}
            index={index + skip}
            checked={selectedSongs.includes(song.id)}
            onChange={() => onListeItemClickHandler(song.id)}
            onOpen={() => {
              window.open(`/player.html?song=${song.id}`, "_blank");
            }}
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
            {"PREVIOUS"}
          </button>
        )}
        {selectedSongs.length ? (
          <button className="delete" onClick={onDeleteClickHandler}>
            DELETE
          </button>
        ) : undefined}
        {songs.length === limit && (
          <button
            onClick={() => {
              paginate(limit);
            }}
          >
            {"NEXT"}
          </button>
        )}
      </Buttons>
    </Root>
  );
};

export default Songs;
