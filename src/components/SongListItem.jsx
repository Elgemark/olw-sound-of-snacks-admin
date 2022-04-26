import React from "react";
import styled from "styled-components";
import Open from "../icons/open";
import _ from "lodash";

const OpenIcon = styled(Open)`
  height: 20px;
`;

const SongListItem = styled(
  ({ show = true, checkBox = true, alias, date, email, index, checked, onChange, onOpen, ...rest }) => (
    <li index={index} {...rest}>
      {checkBox && <input type="checkbox" checked={checked} onChange={onChange} />}
      {_.isInteger(index) && <span className="num">{`${index + 1}.`}</span>}
      {alias && <span className="alias">{alias}</span>}
      {email && <span className="email">{email}</span>}
      {date && <span className="date">{date}</span>}
      <div className="spacer" />
      <OpenIcon className="open-icon" onClick={onOpen} />
    </li>
  )
)`
  width: 100%;
  padding: 0.2rem;
  display: flex;
  background-color: ${({ index, color }) => (color ? color : index % 2 ? "#fff" : "#eee")};
  &:hover {
    background-color: #ffeeff;
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
