import React from "react";
import styled from "styled-components";
import Open from "../icons/open";

const OpenIcon = styled(Open)`
  height: 20px;
`;

const SongListItem = styled(({ show = true, checkBox = true, song, index, checked, onChange, onOpen, ...rest }) => (
  <li key={song.id} index={index} {...rest}>
    {checkBox && <input type="checkbox" checked={checked} onChange={onChange} />}
    <span className="num">{`${index + 1}.`}</span>
    <span className="alias">{song.alias}</span>
    <span className="email">{song.email}</span>
    <OpenIcon className="open-icon" onClick={onOpen} />
  </li>
))`
  width: 100%;
  display: flex;
  background-color: ${({ index, color }) => (color ? color : index % 2 ? "#fff" : "#eee")};
  &:hover {
    background-color: #ffeeff;
  }
  .num {
    width: 30px;
  }
  .alias {
    width: 150px;
  }
  .email {
    flex-grow: 1;
  }
  .open-icon {
    justify-self: flex-end;
    cursor: pointer;
  }
`;

export default SongListItem;
