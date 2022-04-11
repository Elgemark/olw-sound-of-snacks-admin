import React, { useState } from "react";
import moment from "moment";

const SelectWinner = () => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const week = moment(date).week();
  const startOfWeek = moment(date).startOf("isoWeek").format("YYYY-MM-DD");
  const endOfWeek = moment(date).endOf("isoWeek").format("YYYY-MM-DD");

  const onSeletDateHandler = (e) => {
    setDate(e.target.value);
  };

  const onFindWinnerClickHandler = () => {};

  return (
    <div>
      <input type="date" onChange={onSeletDateHandler} value={date} />
      <h3>{`Week: ${week}`}</h3>
      <p>{`from: ${startOfWeek} to: ${endOfWeek}`}</p>
      <button onClick={onFindWinnerClickHandler}>FIND A WINNER!</button>
    </div>
  );
};

export default SelectWinner;
