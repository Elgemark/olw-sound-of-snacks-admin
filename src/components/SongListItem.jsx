import React from "react";
import styled from "styled-components";
import Open from "../icons/open";
import _ from "lodash";

const OpenIcon = styled(Open)`
  height: 20px;
`;

const SongListItem = styled(
  ({
    show = true,
    checkBox = true,
    alias,
    date,
    email,
    firstName,
    lastName,
    index,
    checked,
    onChange,
    onOpen,
    ...rest
  }) => (
    <li index={index} {...rest}>
      {checkBox && <input type="checkbox" checked={checked} onChange={onChange} />}
      {_.isInteger(index) && <span className="num">{`${index + 1}.`}</span>}
      {alias && <span className="alias">{alias}</span>}
      {email && <span className="email">{email}</span>}
      {date && <span className="date">{date}</span>}
      {firstName && <span className="date">{firstName}</span>}
      {lastName && <span className="date">{lastName}</span>}
      <div className="spacer" />
      <OpenIcon className="open-icon" onClick={onOpen} style={{ fill: "white" }} />
    </li>
  )
)`
  width: 100%;
  padding: 0.2rem;
  display: flex;
  color: white;
  background-color: ${({ index, color }) =>
    color ? color : index % 2 ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"};
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  span {
    margin-right: 1rem;
  }
  .alias {
  }
  .num {
    width: 30px;
    margin-right: 0;
  }
  .spacer {
    flex-grow: 1;
  }

  .open-icon {
    justify-self: flex-end;
    cursor: pointer;
  }
`;

export default SongListItem;
