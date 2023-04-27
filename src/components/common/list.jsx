import React, { Component } from "react";

const List = ({
  items,
  textProperty,
  valueProperty,
  onGenreSelected,
  selectedGenre,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onGenreSelected(item)}
          key={item[valueProperty]}
          className={
            item === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

List.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default List;
