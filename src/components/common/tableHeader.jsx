import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (columnName) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.columnName === columnName) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.columnName = columnName;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSort = (column) => {
    const { sortColumn } = this.props;
    if (column.columnName !== sortColumn.columnName) return null;
    if (sortColumn.order === "asc")
      return <i className="fa-solid fa-sort-up"></i>;
    return <i className="fa-solid fa-sort-down"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.columnName || column.key}
              onClick={() => this.raiseSort(column.columnName)}
            >
              {column.label} {this.renderSort(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
