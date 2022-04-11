import React, { useState } from "react";
import moment from "moment";
import { useGetSongsForDates } from "../hooks/songs";
import SongListItem from "../components/SongListItem";
import styled from "styled-components";

const Root = styled.div`
  padding: 1rem;
`;

const OrderedList = styled.ol`
  margin-bottom: 1rem;
  text-align: left;
`;

const SelectWinner = () => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const week = moment(date).week();
  const startOfWeek = moment(date).startOf("isoWeek").format("YYYY-MM-DD");
  const endOfWeek = moment(date).endOf("isoWeek").format("YYYY-MM-DD");

  const songsForWeek = useGetSongsForDates({
    fromDate: startOfWeek,
    toDate: endOfWeek,
  });

  console.log("songsForWeek", songsForWeek);

  const onSeletDateHandler = (e) => {
    setDate(e.target.value);
  };

  const onFindWinnerClickHandler = () => {};

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
