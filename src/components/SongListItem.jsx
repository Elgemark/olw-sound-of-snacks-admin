import React from "react";
import styled from "styled-components";
import Open from "../icons/open";

const OpenIcon = styled(Open)`
  height: 20px;
`;

const SongListItem = styled(({ show = true, checkBox = true, song, index, checked, onChange, ...rest }) => (
  <li key={song.id} index={index} {...rest}>
    {checkBox && <input type="checkbox" checked={checked} onChange={onChange} />}
    <span className="num">{`${index + 1}.`}</span>
    <span className="alias">{song.alias}</span>
    <span className="email">{song.email}</span>
    <OpenIcon />
  </li>
))`
  cursor: pointer;
  display: grid;
  grid-template-columns: 50px 50px 150px 150px;
  grid-template-rows: auto;
  background-color: ${({ index, color }) => (color ? color : index % 2 ? "#fff" : "#eee")};
  &:hover {
    background-color: #ffeeff;
  }
`;

export default SongListItem;
