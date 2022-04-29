import React, { useState } from "react";
import moment from "moment";
import { useGetSongsForDates } from "../hooks/songs";
import SongListItem from "../components/SongListItem";
import styled from "styled-components";
import { useGetWinners } from "../hooks/winners";
import _ from "lodash";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDb } from "../firebase";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  .button-find-winner {
    margin-bottom: 2rem;
  }
  .date-picker {
    background: transparent;
    min-width: 210px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    color: white;
    margin-bottom: 3rem;
  }
`;

const OrderedList = styled.ol`
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;
`;

const SelectWinner = () => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [winnerId, setWinnerId] = useState();
  const [selectedWinners, setSelectedWinners] = useState([]);

  const week = moment(date).week();
  const startOfWeek = moment(date).startOf("isoWeek").format("YYYY-MM-DD");
  const endOfWeek = moment(date).endOf("isoWeek").format("YYYY-MM-DD");

  const songsForWeek = useGetSongsForDates({
    fromDate: startOfWeek,
    toDate: endOfWeek,
  });

  const { winners: winnersForWeek, refetch: refetchWinners, revoke: revokeWinners } = useGetWinners({ week });

  const onSeletDateHandler = (e) => {
    setDate(e.target.value);
  };

  const onFindWinnerClickHandler = async () => {
    const winnerIdsForWeek = winnersForWeek.map((winner) => winner.id);
    // Find song that had not been winning...
    const songsNotWonForWeek = songsForWeek.filter((song) => !winnerIdsForWeek.includes(song.id));
    // Find a winner
    const song = songsNotWonForWeek[_.random(songsNotWonForWeek.length - 1)];
    //
    const docRef = doc(getDb(), "emails", song.id);
    const emailSnap = getDoc(docRef);
    if ((await emailSnap).exists()) {
      const emailData = (await emailSnap).data();
      await setDoc(doc(getDb(), "winners", song.id), { ...emailData, ...song, week, revoked: false });
      await refetchWinners();
      setWinnerId(song.id);
    }
  };

  const onListeItemClickHandler = (songId) => {
    const updatedSongs = [...selectedWinners];
    if (updatedSongs.includes(songId)) {
      _.remove(updatedSongs, (id) => id === songId);
    } else {
      updatedSongs.push(songId);
    }
    setSelectedWinners(updatedSongs);
  };

  const onRevokeClickHandler = () => {
    revokeWinners(selectedWinners).then(() => {
      setSelectedWinners([]);
      refetchWinners();
    });
  };

  return (
    <Root>
      <h2>Select week</h2>
      <input className="date-picker" type="date" onChange={onSeletDateHandler} value={date} />
      <button
        className="button-find-winner"
        onClick={() => {
          onFindWinnerClickHandler();
        }}
      >
        Pick a winner!
      </button>
      <h2>{`Week: ${week}, ${songsForWeek.length} submissions, ${winnersForWeek.length} winners`}</h2>
      <OrderedList>
        {winnersForWeek.map((winner, index) => (
          <SongListItem
            key={winner.id}
            checked={selectedWinners.includes(winner.id)}
            onChange={() => onListeItemClickHandler(winner.id)}
            index={index}
            alias={winner.alias}
            email={winner.email}
            firstName={winner.firstName}
            lastName={winner.lastName}
            date={winner.servertime && moment.utc(winner?.servertime?.seconds * 1000).format("YYYY:MM:DD HH:mm")}
            color={winner.id === winnerId ? "#0f9f4b" : undefined}
            onOpen={() => {
              window.open(`/player.html?song=${winner.id}`, "_blank");
            }}
          />
        ))}
      </OrderedList>
      {selectedWinners.length ? (
        <button className="delete" onClick={onRevokeClickHandler}>
          Revoke
        </button>
      ) : undefined}
    </Root>
  );
};

export default SelectWinner;
