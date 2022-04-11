import React, { useState } from "react";
import moment from "moment";
import { useGetSongsForDates } from "../hooks/songs";
import SongListItem from "../components/SongListItem";
import styled from "styled-components";
import { useGetWinners } from "../hooks/winners";
import _ from "lodash";
import { doc, getDoc } from "firebase/firestore";
import { getDb } from "../firebase";

const Root = styled.div`
  padding: 1rem;
`;

const OrderedList = styled.ol`
  margin-bottom: 1rem;
  text-align: left;
`;

const SelectWinner = () => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [winnerId, setWinnerId] = useState(moment().format("YYYY-MM-DD"));

  const week = moment(date).week();
  const startOfWeek = moment(date).startOf("isoWeek").format("YYYY-MM-DD");
  const endOfWeek = moment(date).endOf("isoWeek").format("YYYY-MM-DD");

  const songsForWeek = useGetSongsForDates({
    fromDate: startOfWeek,
    toDate: endOfWeek,
  });

  const { winners: winnersForWeek, postWinner } = useGetWinners({ week });

  console.log("songsForWeek", { songsForWeek, winnersForWeek });

  const onSeletDateHandler = (e) => {
    setDate(e.target.value);
  };

  const onFindWinnerClickHandler = async () => {
    const song = songsForWeek[_.random(songsForWeek.length - 1)];

    const docRef = doc(getDb(), "emails", song.id);
    const emailSnap = getDoc(docRef);
    if ((await emailSnap).exists()) {
      const email = (await emailSnap).data();
      debugger;
      // postWinner(song.id, _.pick(song, "alias", "data"));
    } else {
      debugger;
    }
  };

  return (
    <Root>
      <input type="date" onChange={onSeletDateHandler} value={date} />
      <h3>{`Week: ${week}`}</h3>
      <p>{`from: ${startOfWeek} to: ${endOfWeek}`}</p>
      <button onClick={onFindWinnerClickHandler}>FIND A WINNER!</button>
    </Root>
  );
};

export default SelectWinner;
