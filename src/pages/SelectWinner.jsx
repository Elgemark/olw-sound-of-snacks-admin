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
  padding: 1rem;
  .button-find-winner {
    margin-bottom: 1rem;
  }
`;

const OrderedList = styled.ol`
  margin-bottom: 1rem;
  text-align: left;
`;

const SelectWinner = () => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [winnerId, setWinnerId] = useState();

  const week = moment(date).week();
  const startOfWeek = moment(date).startOf("isoWeek").format("YYYY-MM-DD");
  const endOfWeek = moment(date).endOf("isoWeek").format("YYYY-MM-DD");

  const songsForWeek = useGetSongsForDates({
    fromDate: startOfWeek,
    toDate: endOfWeek,
  });

  const { winners: winnersForWeek, refetch: refetchWinners } = useGetWinners({ week });

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
      await setDoc(doc(getDb(), "winners", song.id), { ...emailData, ...song, week });
      await refetchWinners();
      setWinnerId(song.id);
    }
  };

  return (
    <Root>
      <input type="date" onChange={onSeletDateHandler} value={date} />
      <h3>{`Week: ${week}, ${songsForWeek.length} songs`}</h3>
      {/* <p>{`from: ${startOfWeek} to: ${endOfWeek}`}</p> */}
      <button
        className="button-find-winner"
        onClick={() => {
          onFindWinnerClickHandler();
        }}
      >
        FIND A WINNER!
      </button>
      <h4>Winners:</h4>
      <OrderedList>
        {winnersForWeek.map((winner, index) => (
          <SongListItem
            key={winner.id}
            checkBox={false}
            index={index}
            alias={winner.alias}
            email={winner.email}
            firstName={winner.firstName}
            lastName={winner.lastName}
            date={winner.servertime && moment.utc(winner?.servertime?.seconds * 1000).format("YYYY:MM:DD HH:mm")}
            color={winner.id === winnerId ? "#aaffaa" : undefined}
            onOpen={() => {
              window.open(`/?id=${winner.data}`, "_blank");
            }}
          />
        ))}
      </OrderedList>
    </Root>
  );
};

export default SelectWinner;
